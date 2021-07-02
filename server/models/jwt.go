package models

import (
	"github.com/golang-jwt/jwt"
)

// CustomClaims -> a claimed-token for jwt pkg
type CustomClaims struct {
	Username 	string `json:"username"`
	ID 			int64 `json:"_id"`
	jwt.StandardClaims
}

// RequiredDataToClaims -> is the struct with the required data that is needed for claiming the token
type RequiredDataToClaims struct {
	Username	string
	ID 			int64
}