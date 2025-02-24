import express from "express"
import homeController, { handleHelloWorld } from "../controller/homeController";
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/about",homeController.handleAbout)
    router.get("/user",homeController.handleUserPage)

    // Auth:
    router.post("/users/create-user", homeController.handleCreateNewUser)

    return app.use("/", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initWebRoutes