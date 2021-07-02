package service

import (
	"context"

	"github.com/Thiti-Dev/traveller/database"
	db_model "github.com/Thiti-Dev/traveller/database/models"
	"github.com/Thiti-Dev/traveller/models"
	"github.com/Thiti-Dev/traveller/packages/pkg_bcrypt"
	"github.com/Thiti-Dev/traveller/packages/pkg_jwt"
	"github.com/Thiti-Dev/traveller/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)


type AuthServer struct {
}

func NewAuthServer() *AuthServer {
	return &AuthServer{}
}

func (server *AuthServer) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	username := req.GetUsername()
	password := req.GetPassword()

	dbInstance := database.GetEstablishedPostgresConnection()
	user := new(db_model.User)
	err := dbInstance.Model(user).Where("username = ?", username).Limit(1).Select()
	if err != nil {
		// err means not found in go-pg
		//return nil, status.Errorf(codes.Internal, "cannot find user: %v", err)
		return nil, status.Errorf(codes.NotFound, "incorrect username/password")
	}

	if (*user == db_model.User{} || !pkg_bcrypt.CheckPasswordHash(password, user.Password)) {
		return nil, status.Errorf(codes.NotFound, "incorrect username/password")
	}

	token, err := pkg_jwt.GetSignedTokenFromData(models.RequiredDataToClaims{
		Username: user.Username,
		ID:       user.Id,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	res := &pb.LoginResponse{
		AccessToken: token,
	}

	return res, nil

}