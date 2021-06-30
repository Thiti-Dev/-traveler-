package service

import (
	"context"
	"fmt"
	"log"

	"github.com/Thiti-Dev/traveller/database"
	"github.com/Thiti-Dev/traveller/database/models"
	"github.com/Thiti-Dev/traveller/packages/pkg_bcrypt"
	"github.com/Thiti-Dev/traveller/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserServer struct{
	pb.UnimplementedUserServiceServer
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
	
	user := &models.User{
		Username: username,
		Password: hashed_str,
	}

	dbInstance := database.GetEstablishedPostgresConnection()

	// check if username is already exist
	exist_user := new(models.User)
	dbInstance.Model(exist_user).Where("username = ?",req.GetUsername()).Limit(1).Select()
	fmt.Printf("user: %v",exist_user)
	if (*exist_user != models.User{}){ // check if struct isn't zero value
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