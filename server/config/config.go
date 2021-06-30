package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadConfig -> Load a config into the os context
func LoadConfig() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Failed to load the .env file")
	}
}


// Get the Env value [extracts from the os]
func GetEnvironmentValue(key string)string{
	return os.Getenv(key)
}