package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println(err)
	}
	go hostDashboard()
	hostHome()

}

func hostHome() {
	fs := http.FileServer(http.Dir("./website"))
	http.Handle("/", fs)

	port := os.Getenv("PORT")
	log.Printf("Listening on :%s ...", port)
	err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

func hostDashboard() {
	app := gin.New()
	stakingPath := "./staking/build"
	if os.Getenv("PRODUCTION") == "true" {
		log.Println("Production dashboard")
		stakingPath = ".build/"
	} else {
		log.Println("dev dashboard")
	}
	app.Use(static.Serve("/", static.LocalFile(stakingPath, true)))
	app.Use(static.Serve("/staking", static.LocalFile(stakingPath, true)))
	app.Use(static.Serve("/dashboard", static.LocalFile(stakingPath, true)))

	app.Run(":" + os.Getenv("DASHBOARD_PORT"))
}
