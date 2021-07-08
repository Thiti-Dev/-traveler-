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