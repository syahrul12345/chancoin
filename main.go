package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println(err)
	}

	fs := http.FileServer(http.Dir("./website"))
	http.Handle("/", fs)

	port := os.Getenv("PORT")
	log.Printf("Listening on :%s ...", port)
	err = http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}

}
