import express from "express"
import homeController from "../controller/homeController";
import authController from "../controller/authController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initAuthRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    router.all("*", jwtActions.checkUserCookie)

    router.post("/auth/create-user",authController.handleCreateUser)
    router.post("/auth/client/register",authController.handleCreateUser)
    router.post("/auth/client/login",authController.handleLogin)
    router.get("/auth/get-user",authController.handleGetUser)

    router.get("/auth/get-all-user",authController.handleGetAllUser)
    router.put("/auth/update-user",authController.handleUpdateUser)
    router.put("/auth/change-password",authController.handleChangePassword)

    // For Admin:
    router.post("/auth/admin/login",authController.handleAdminLogin)
    router.post("/auth/admin/add-user", authController.handleCreateUser)
    router.put("/auth/admin/change-password",authController.handleChangePassword)
    
    //group:
    router.get("/group/get-all-group", authController.handleGetAllGroup)

    // Xóa User: Xóa Bill, BillBook, Cart, Wishlist


    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initAuthRoutes