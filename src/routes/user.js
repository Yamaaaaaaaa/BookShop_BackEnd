import express from "express"
import userController from "../controller/userController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initUserRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie): khai báo 1 lần cái này thôi

    // Profile
    router.get("/user/get-user-profile", userController.handleGetProfile)
    
    //Cart: 
    router.get("/user/get-cart", userController.handleGetCart)
    router.put("/user/update-cart", userController.handleUpdateCart)
    router.post("/user/add-to-cart", userController.handleAddToCart)

    //Payment Method: 
    router.get("/payment/get-paymentMethod", userController.handleGetPaymentMethod)

    //User: 
    router.get("/user/get-all-user", userController.handleGetAllUser)
    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initUserRoutes