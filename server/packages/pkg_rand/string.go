package pkg_rand

import (
	"math/rand"
	"time"
)


var seed_needed bool = true

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandStringRunes(n int) string {

	if seed_needed{
		rand.Seed(time.Now().UnixNano())
		seed_needed = false
	}

	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}