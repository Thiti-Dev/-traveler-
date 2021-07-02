package service

import (
	"context"
	"fmt"
	"log"

	"github.com/Thiti-Dev/traveller/database"
	"github.com/Thiti-Dev/traveller/database/models"
	models_ext "github.com/Thiti-Dev/traveller/models"
	"github.com/Thiti-Dev/traveller/packages/pkg_bcrypt"
	"github.com/Thiti-Dev/traveller/packages/pkg_jwt"
	"github.com/Thiti-Dev/traveller/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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

func (server *UserServer) LoginUser(ctx context.Context, req *pb.LoginUserRequest) (*pb.LoginUserResponse, error){
	username := req.GetUsername()
	password := req.GetPassword()

	dbInstance := database.GetEstablishedPostgresConnection()
	user := new(models.User)
	err := dbInstance.Model(user).Where("username = ?",username).Limit(1).Select()
	if err != nil{
		// err means not found in go-pg
		//return nil, status.Errorf(codes.Internal, "cannot find user: %v", err)
		return nil, status.Errorf(codes.NotFound, "incorrect username/password")
	}

	if (*user == models.User{} || !pkg_bcrypt.CheckPasswordHash(password,user.Password)){
		return nil, status.Errorf(codes.NotFound, "incorrect username/password")
	}

	token, err := pkg_jwt.GetSignedTokenFromData(models_ext.RequiredDataToClaims{
		Username: user.Username,
		ID: user.Id,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	res := &pb.LoginUserResponse{
		AccessToken: token,
	}

	return res,nil

}