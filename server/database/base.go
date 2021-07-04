package database

import (
	"context"
	"fmt"

	"github.com/Thiti-Dev/traveller/database/models"
	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

//Globally Accessible
var databaseConnection *pg.DB
// ────────────────────────────────────────────────────────────────────────────────

// ─── INSTANCE METHODS ───────────────────────────────────────────────────────────
func createSchema(db *pg.DB) error {
    models := []interface{}{
        (*models.User)(nil),
		(*models.ProofThread)(nil),
    }

    for _, model := range models {
        err := db.Model(model).CreateTable(&orm.CreateTableOptions{
            Temp: false, // Not temporary
			IfNotExists: true,
        })
        if err != nil {
            return err
        }
    }
    return nil
}
// ────────────────────────────────────────────────────────────────────────────────



func CreatePostgresConnection() {
	db := pg.Connect(&pg.Options{
		Addr:     ":5432",
		User:     "postgres",
		Password: "root",
		Database: "traveller",
	})

	// Creating table from declared model
	err := createSchema(db)
    if err != nil {
        panic(err)
    }
	// ────────────────────────────────────────────────────────────────────────────────


	// Check if db is up and running
	ctx := context.Background()
	if err := db.Ping(ctx); err != nil {
		panic(err)
	}
	// ────────────────────────────────────────────────────────────────────────────────

	fmt.Printf("Connected to postgresDB: %v\n",db)
	databaseConnection = db
}

func GetEstablishedPostgresConnection() *pg.DB{
	return databaseConnection
}