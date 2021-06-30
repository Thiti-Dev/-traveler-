package models

import "fmt"

type User struct {
	Id       int64
	Username string
	Password string
}

func (u *User) String() string {
	return fmt.Sprintf("User <%d %s %s>", u.Id,u.Username,u.Password)
}