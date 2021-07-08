package models

import (
	"fmt"
	"time"
)


type User struct {
	Id       int64
	Username string
	Password string
	CreatedAt time.Time
}

func (u *User) String() string {
	return fmt.Sprintf("User <%d %s %s>", u.Id,u.Username,u.Password)
}