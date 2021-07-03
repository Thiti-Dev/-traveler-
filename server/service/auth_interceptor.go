package service

import (
	"context"
	"fmt"
	"log"

	"github.com/Thiti-Dev/traveller/database"
	db_model "github.com/Thiti-Dev/traveller/database/models"
	"github.com/Thiti-Dev/traveller/packages/pkg_jwt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)


type AuthInterceptor struct {
	jwt_secret      string
	accessibleRoles map[string][]string
}

func NewAuthInterceptor(secret string, accessibleRoles map[string][]string) *AuthInterceptor {
	return &AuthInterceptor{jwt_secret: secret, accessibleRoles: accessibleRoles}
}

func (interceptor *AuthInterceptor) Unary() grpc.UnaryServerInterceptor{
	return func(ctx context.Context, req interface{},info *grpc.UnaryServerInfo, handler grpc.UnaryHandler)(interface{},error){
		log.Println("--> unary interceptor: " , info.FullMethod) // /{proj_name}.{service_name}}/{service_method} -> /traveller.UserService/LoginUser
		err := interceptor.authorize(&ctx, info.FullMethod)
		if err != nil {
			return nil,err
		}
		return handler(ctx,req)
	}
}

func (interceptor *AuthInterceptor) Stream() grpc.StreamServerInterceptor{
	return func (srv interface{},stream grpc.ServerStream,info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {
		log.Println("--> unary interceptor: " , info.FullMethod) // /{proj_name}.{service_name}}/{service_method} -> /traveller.UserService/LoginUser
		ctx := stream.Context()
		err := interceptor.authorize(&ctx, info.FullMethod)
		if err != nil {
			return err
		}

		return handler(srv,stream)
	}
}

func (interceptor *AuthInterceptor) authorize(ctx *context.Context,method string)error{
	_,ok := interceptor.accessibleRoles[method]
	if !ok {
		// everyone can access [key is not exist]
		return nil
	}

	md,ok := metadata.FromIncomingContext(*ctx)
	if !ok {
		return status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}

	values := md["authorization"]
	if len(values) == 0{
		return status.Errorf(codes.Unauthenticated,"authorization token is not provided")
	}

	accessToken := values[0]

	claims,err := pkg_jwt.Verify(accessToken)
	if err!=nil{
		return status.Errorf(codes.Unauthenticated, "access token is invalid: %v",err)
	}

	// ─── FETCHING USER DATA ─────────────────────────────────────────────────────────
	dbInstance := database.GetEstablishedPostgresConnection()
	exist_user := new(db_model.User)
	err = dbInstance.Model(exist_user).Where("username = ?",claims.Username).Limit(1).Select()
	if err != nil {
		// not found
		return status.Error(codes.Unauthenticated, "the account isn't exist anymore")
	}else{
		send, _ := metadata.FromIncomingContext(*ctx)
		newMD  := metadata.Pairs("user-id", fmt.Sprint(exist_user.Id))
		*ctx = metadata.NewIncomingContext(*ctx, metadata.Join(send, newMD))
		return nil
	}
	// ────────────────────────────────────────────────────────────────────────────────

	
	/*for _,role := range accessibleRoles {
		if role == claims.Role{
			return nil
		}
	}*/
	
	return status.Error(codes.PermissionDenied, "no permission to access this rpc")

}