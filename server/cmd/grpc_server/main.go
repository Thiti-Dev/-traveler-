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

func runGRPCServer(
	userService pb.UserServiceServer,
	listener net.Listener,
)error{
	grpcServer := grpc.NewServer()
	pb.RegisterUserServiceServer(grpcServer,userService)
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
	runGRPCServer(userService,listener)
}