import express from "express"
import configViewEngine from "./config/viewEngines"
import initWebRoutes from "./routes/web"
import initAuthRoutes from "./routes/auth"
import initBookRoutes from "./routes/book"

import connection from "./config/connectDB"
import bodyParser from "body-parser"
import configCORS from "./config/cors"
import cookieParser from "cookie-parser"

require("dotenv").config()

const app = express()

// 0. Test: 
connection()


const PORT = process.env.PORT || 8080
app.listen(PORT, () =>{
    console.log(">>>JWT WEB is running in PORT: " + PORT)
})

// 1. config viewEngine
configViewEngine(app)

// 2. config MiddleWare bodyParser: 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// 3. Tạo 1 MiddleWare Giải quyết CORS
// Add headers before the routes are defined
configCORS(app)

// 4. Config Cookie Parser: Từ bây h, các request ta đẩy lên thì sẽ đều đc thao tác với cookie thông qua req.cookie
app.use(cookieParser())


// 5. init web route
initWebRoutes(app)
initAuthRoutes(app)
initBookRoutes(app)


