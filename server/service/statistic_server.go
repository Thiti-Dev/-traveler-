package service

import (
	"context"

	"github.com/Thiti-Dev/traveller/pb"

	"github.com/Thiti-Dev/traveller/database"
	db_model "github.com/Thiti-Dev/traveller/database/models"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)


type StatisticServer struct {
}

func NewStatisticServer() *StatisticServer {
	return &StatisticServer{}
}

func (server *StatisticServer) GetTotalUser(ctx context.Context, req *emptypb.Empty) (*pb.GetTotalUserResponse, error) {

	dbInstance:= database.GetEstablishedPostgresConnection()
	user_count ,err := dbInstance.Model((*db_model.User)(nil)).Count() //TODO find out what ()() actually means
	if err != nil{
		return nil, status.Errorf(
			codes.Internal,
			"Cannot get the count of the user relation",
		)
	}

	return &pb.GetTotalUserResponse{
		TotalUser: int64(user_count),
	},nil
}

func (server *StatisticServer) GetTotalSolvedThread(ctx context.Context, req *emptypb.Empty) (*pb.GetTotalSolvedThreadResponse, error) {

	dbInstance:= database.GetEstablishedPostgresConnection()
	solved_thread_count ,err := dbInstance.Model((*db_model.ProofThread)(nil)).Where("is_solved = ?", true).Count()
	if err != nil{
		return nil, status.Errorf(
			codes.Internal,
			"Cannot get the count of the total solved thread",
		)
	}

	return &pb.GetTotalSolvedThreadResponse{
		TotalSolvedThread: int64(solved_thread_count),
	},nil
}

func (server *StatisticServer) GetTotalTraveler(ctx context.Context, req *emptypb.Empty) (*pb.GetTotalTravelerResponse, error) {

	dbInstance:= database.GetEstablishedPostgresConnection()
	solved_thread_count ,err := dbInstance.Model((*db_model.ProofThread)(nil)).Where("is_solved = ?", true).DistinctOn("solver_id").Count()
	if err != nil{
		return nil, status.Errorf(
			codes.Internal,
			"Cannot get the count of the total solved thread",
		)
	}

	return &pb.GetTotalTravelerResponse{
		TotalTravler: int64(solved_thread_count),
	},nil
}

func (server *StatisticServer) GetUserStatistic(ctx context.Context, req *pb.GetUserStatisticRequest) (*pb.GetUserStatisticResponse, error){
	userId := req.GetUserId()
	dbInstance:= database.GetEstablishedPostgresConnection()
	/*
	threadCreatedCount ,err := dbInstance.Model((*db_model.ProofThread)(nil)).Where("creator_id = ?", userId).Count() 
	if err != nil{
		return nil, status.Errorf(
			codes.Internal,
			"Cannot get the count of the total user created thread",
		)
	}

	threadCrackedCount ,err := dbInstance.Model((*db_model.ProofThread)(nil)).Where("solver_id = ?", userId).Count() 
	if err != nil{
		return nil, status.Errorf(
			codes.Internal,
			"Cannot get the count of the total thread cracked by user",
		)
	}
	*/

	// ─── parallel ────────────────────────────────────────────────────────────────────

	type PResult = struct{
		value int64
		err error
	}



	getCreatedThreadCount:= func() <- chan *PResult{
		r := make(chan *PResult)
		
		go func(){
			defer close(r)
			threadCreatedCount ,err := dbInstance.Model((*db_model.ProofThread)(nil)).Where("creator_id = ?", userId).Count() 
			if err != nil{
				r <- &PResult{
					err: status.Errorf(
						codes.Internal,
						"Cannot get the count of the total user created thread",
					),
				}
			}
			r <- &PResult{
				value: int64(threadCreatedCount),
				err: nil,
			}
			
		}()
		return r
	}

	getCrackedThreadCount:= func() <- chan  *PResult{
		r := make(chan  *PResult)
		
		go func(){
			defer close(r)
			threadCrackedCount ,err := dbInstance.Model((*db_model.ProofThread)(nil)).Where("solver_id = ?", userId).Count() 
			if err != nil{
				r <- &PResult{
					err: status.Errorf(
						codes.Internal,
						"Cannot get the count of the total thread cracked by user",
					),
				}
			}
			r <- &PResult{
				value: int64(threadCrackedCount),
				err: nil,
			}
			
		}()
		return r
	}

	createdThreadCountCh, crackedThreadCountCh := getCreatedThreadCount(),getCrackedThreadCount()
	threadCreatedCount,threadCrackedCount := <- createdThreadCountCh, <-crackedThreadCountCh

	if threadCreatedCount.err != nil {
		return nil , threadCreatedCount.err
	}
	if threadCrackedCount.err != nil {
		return nil , threadCrackedCount.err
	}

	// ────────────────────────────────────────────────────────────────────────────────




	return &pb.GetUserStatisticResponse{
		ThreadCreated: threadCreatedCount.value,
		ThreadCracked: threadCrackedCount.value,
	},nil
}