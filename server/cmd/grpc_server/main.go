package main

import (
	"context"
	"log"
	"net"

	"github.com/Thiti-Dev/traveller/config"
	"github.com/Thiti-Dev/traveller/database"
	"github.com/Thiti-Dev/traveller/pb"
	"github.com/Thiti-Dev/traveller/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

// ─── INTERCEPTOR ────────────────────────────────────────────────────────────────
func unaryInterceptor(ctx context.Context, req interface{},info *grpc.UnaryServerInfo, handler grpc.UnaryHandler)(interface{},error){
	log.Println("--> unary interceptor: " , info.FullMethod) // /{proj_name}.{service_name}}/{service_method} -> /traveller.UserService/LoginUser
	return handler(ctx,req)
}
func streamInterceptor(srv interface{},stream grpc.ServerStream,info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {
	log.Println("--> unary interceptor: " , info.FullMethod) // /{proj_name}.{service_name}}/{service_method} -> /traveller.UserService/LoginUser
	return handler(srv,stream)
}
// ────────────────────────────────────────────────────────────────────────────────


func runGRPCServer(
	userService pb.UserServiceServer,
	listener net.Listener,
)error{
	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(unaryInterceptor),
		grpc.StreamInterceptor(streamInterceptor),
	)

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