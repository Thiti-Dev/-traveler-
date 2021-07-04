package models

import (
	"time"
)


type ProofThread struct {
	Id       								int64
	CreatorId 								int64
	ContentMsg 								string
	SecretCode								string
	CreatedAt								time.Time
	AmountOfDayWouldBeLastUntil				int64
	RevealAt								time.Time
	IsSolved								bool
	SolverId								int64
	SolverAka								string
	SolvedAt								time.Time
}
