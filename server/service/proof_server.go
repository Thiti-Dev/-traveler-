package service

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/Thiti-Dev/traveller/database"
	db_model "github.com/Thiti-Dev/traveller/database/models"
	"github.com/Thiti-Dev/traveller/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	ts "google.golang.org/protobuf/types/known/timestamppb"
)


type ProofServer struct {
}

func NewProofServer() *ProofServer {
	return &ProofServer{}
}

func (server *ProofServer) CreateProofThread(ctx context.Context, req *pb.CreateProofThreadRequest) (*pb.CreateProofThreadResponse, error) {
	md,ok := metadata.FromIncomingContext(ctx)
	if ok {
		userIdAsString := md["user-id"][0] // caller id
		userId,_ := strconv.ParseInt(userIdAsString,10,64)

		time_now := ts.Now() // protobuf format
		reveal_at := ts.Now().AsTime().AddDate(0,0,int(req.GetAmountOfDayWouldBeLastUntil())) // go format

		proofThread := &db_model.ProofThread{
			CreatorId: userId,
			ContentMsg: req.GetContentMsg(),
			SecretCode: "xxx64xxx",
			AmountOfDayWouldBeLastUntil: req.GetAmountOfDayWouldBeLastUntil(),
			IsSolved: false,
			CreatedAt: time_now.AsTime(),
			RevealAt: reveal_at,
		}

		dbInstance := database.GetEstablishedPostgresConnection()

		_, err := dbInstance.Model(proofThread).Insert()
		if err != nil {
			return nil , status.Errorf(
				codes.Internal,
				fmt.Sprintf("problem inserting proofThread: %v", err),
			)
		}

		return &pb.CreateProofThreadResponse{
			ProofThread: &pb.ProofThread{
				Id: proofThread.Id,
				CreatorId: proofThread.CreatorId,
				ContentMsg: proofThread.ContentMsg,
				SecretCode: proofThread.SecretCode,
				AmountOfDayWouldBeLastUntil: proofThread.AmountOfDayWouldBeLastUntil,
				CreatedAt: time_now,
				RevealAt: ts.New(reveal_at),
				IsSolved: proofThread.IsSolved,
				SolverId: proofThread.SolverId,
				SolverAka: proofThread.SolverAka,
				SolvedAt: ts.New(proofThread.SolvedAt),
			},
		},nil


	}else{
		return nil, status.Errorf(
			codes.Internal,
			"This shouldn't happened",
		)
	}
}

func (server *ProofServer) GetAllProofThread(ctx context.Context, req *emptypb.Empty) (*pb.GetAllProofThreadResponse, error){
	dbInstance := database.GetEstablishedPostgresConnection()
	var proofThreads []db_model.ProofThread
	err := dbInstance.Model(&proofThreads).Select()
	if err !=nil{
		log.Fatalf("problem fetching all user:%v",err)
	}

	var proofThreadsAsPb []*pb.ProofThread
	for _,thread := range proofThreads{
		proofThreadsAsPb = append(proofThreadsAsPb, &pb.ProofThread{
			Id: thread.Id,
			CreatorId: thread.CreatorId,
			ContentMsg: thread.ContentMsg,
			SecretCode: thread.SecretCode,
			AmountOfDayWouldBeLastUntil: thread.AmountOfDayWouldBeLastUntil,
			CreatedAt: ts.New(thread.CreatedAt),
			RevealAt: ts.New(thread.RevealAt),
			IsSolved: thread.IsSolved,
			SolverId: thread.SolverId,
			SolverAka: thread.SolverAka,
			SolvedAt: ts.New(thread.SolvedAt),
		})
	}

	return &pb.GetAllProofThreadResponse{
		ProofThreads: proofThreadsAsPb,
	},nil
}