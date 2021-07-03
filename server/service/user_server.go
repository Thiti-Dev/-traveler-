package service

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/Thiti-Dev/traveller/database"
	db_model "github.com/Thiti-Dev/traveller/database/models"
	"github.com/Thiti-Dev/traveller/packages/pkg_bcrypt"
	"github.com/Thiti-Dev/traveller/pb"
	"github.com/go-pg/pg/v10"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

type UserServer struct{
	//pb.UnimplementedUserServiceServer // Un comment this if you want to ignore the unimplemented error
}

func NewUserServer() *UserServer {
	return &UserServer{}
}


func (server *UserServer) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error){
	username := req.GetUsername()
	password := req.GetPassword()

	hashed_str,err := pkg_bcrypt.HashPassword(password)
	if err != nil{
		log.Fatalf("Cannot hash the %v",hashed_str)
	}
	
	user := &db_model.User{
		Username: username,
		Password: hashed_str,
	}

	dbInstance := database.GetEstablishedPostgresConnection()

	// check if username is already exist
	exist_user := new(db_model.User)
	dbInstance.Model(exist_user).Where("username = ?",req.GetUsername()).Limit(1).Select()
	fmt.Printf("user: %v",exist_user)
	if (*exist_user != db_model.User{}){ // check if struct isn't zero value
		return nil, status.Errorf(
			codes.AlreadyExists,
			fmt.Sprintf("Username of %v is already existed",req.GetUsername()),
		)
	}
	// ────────────────────────────────────────────────────────────────────────────────



	_,err = dbInstance.Model(user).Insert()
	if err != nil {
		panic(err)
	}
	log.Printf("Insertion res: %v",user)

	response := &pb.CreateUserResponse{
		User: &pb.User{
			Id: user.Id,
			Username: user.Username,
			Password: user.Password,
		},
	}

	return response,nil
}

func (server *UserServer) GetAllUser(ctx context.Context, req *emptypb.Empty) (*pb.GetAllUserResponse, error){

	// ─── PASSED IN HEADER LOGGING ───────────────────────────────────────────────────
	md,ok := metadata.FromIncomingContext(ctx)
	if ok {
		//fmt.Printf("%v",md)
		userId := md["user-id"][0]
		fmt.Printf("UserID:%v\n",userId)
	}
	// ────────────────────────────────────────────────────────────────────────────────


	dbInstance := database.GetEstablishedPostgresConnection()

	var users []db_model.User
	err := dbInstance.Model(&users).Select()
	if err !=nil{
		log.Fatalf("problem fetching all user:%v",err)
	}

	var usersDetail []*pb.UserDetail
	for _,user := range users{
		usersDetail = append(usersDetail, 
			&pb.UserDetail{
				Id: user.Id,
				Username: user.Username,
			},
		)
	}

	return &pb.GetAllUserResponse{
		Users: usersDetail,
	},nil
}

func (server *UserServer) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error){
	username := req.GetUsername()

	dbInstance := database.GetEstablishedPostgresConnection()

	user := new(db_model.User)
	err := dbInstance.Model(user).Where("username = ?",username).Limit(1).Select()
	if err != nil{
		if err == pg.ErrNoRows{
			return nil,status.Errorf(
				codes.NotFound,
				fmt.Sprintf("username: %v doesn't exist on the server",username),
			)
		}else{
			log.Fatalf("error getting user : %v",errors.Unwrap(err))
		}
	}

	return &pb.GetUserResponse{
		User: &pb.UserDetail{
			Id: user.Id,
			Username: user.Username,
		},
	},nil
}