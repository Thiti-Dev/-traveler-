package models

import (
	"time"
)


type ProofThread struct {
	Id       								int64
	CreatorId 								int64
	CreatorData								*User `pg:"rel:has-one,fk:creator_id,join_fk:id"`
	ContentMsg 								string
	SecretCode								string
	CreatedAt								time.Time
	AmountOfDayWouldBeLastUntil				int64
	RevealAt								time.Time
	IsSolved								bool `pg:",use_zero"`
	SolverId								int64
	SolverAka								string
	SolvedAt								time.Time
}
