import express from "express"
import configViewEngine from "./config/viewEngines"
import initWebRoutes from "./routes/web"
import connection from "./config/connectDB"

require("dotenv").config()

const app = express()
connection()

// config viewEngine
configViewEngine(app)

// init web route
initWebRoutes(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () =>{
    console.log(">>>JWT WEB is running in PORT: " + PORT)
})
