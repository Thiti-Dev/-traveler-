package pkg_jwt

import (
	"fmt"
	"time"

	"github.com/Thiti-Dev/traveller/config"
	"github.com/Thiti-Dev/traveller/models"
	"github.com/golang-jwt/jwt"
)

func GetSignedTokenFromData(data models.RequiredDataToClaims) (string, error){
	tokenClaims := models.CustomClaims{
		Username: data.Username,
		ID: data.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			Issuer: "traveller.io",
		},
	}

	// Create an unsigned token from the claims above
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, tokenClaims)
	// Sign the token ->  preferably at least 256 bits in length (in-production xD)
	signedToken, err := token.SignedString([]byte(config.GetEnvironmentValue("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func Verify(accessToken string) (*models.CustomClaims, error){
	token,err := jwt.ParseWithClaims(accessToken,&models.CustomClaims{},func(token *jwt.Token)(interface{},error){
		_,ok := token.Method.(*jwt.SigningMethodHMAC) //TODO learn more on here
		if !ok {
			return nil,fmt.Errorf("Unexpeted token signing method")
		}
		return []byte(config.GetEnvironmentValue("JWT_SECRET")), nil
	})

	if err != nil{
		return nil,fmt.Errorf("Invalid Token:%w",err)
	}

	claims, ok := token.Claims.(*models.CustomClaims)
	if !ok {
		return nil,fmt.Errorf("Invalid token claims")
	}
	return claims, nil
}