package pkg_jwt

import (
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