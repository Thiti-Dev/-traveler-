package main

import (
	"log"
	"net"

	"github.com/Thiti-Dev/traveller/config"
	"github.com/Thiti-Dev/traveller/database"
	"github.com/Thiti-Dev/traveller/pb"
	"github.com/Thiti-Dev/traveller/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func accessibleRoles() map[string][]string{
	const userServicePath = "/traveller.UserService/" 
	return map[string][]string{
		userServicePath + "GetAllUser": {"user"},
	}
}

func runGRPCServer(
	userService pb.UserServiceServer,
	authService pb.AuthServiceServer,
	listener net.Listener,
)error{
	authInterceptor := service.NewAuthInterceptor(config.GetEnvironmentValue("JWT_SECRET"),accessibleRoles())
	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(authInterceptor.Unary()),
		grpc.StreamInterceptor(authInterceptor.Stream()),
	)

	pb.RegisterUserServiceServer(grpcServer,userService)
	pb.RegisterAuthServiceServer(grpcServer,authService)
	reflection.Register(grpcServer) // register the reflection
	log.Printf("Starting GRPC server at %s", listener.Addr().String())
	return grpcServer.Serve(listener)
}



func main() {
	listener,err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v" , err)
	}

	// ENSURING
	config.LoadConfig() // load the env config
	database.CreatePostgresConnection()
	// ────────────────────────────────────────────────────────────────────────────────


	userService := service.NewUserServer()
	authService := service.NewAuthServer()
	runGRPCServer(userService,authService,listener)
}