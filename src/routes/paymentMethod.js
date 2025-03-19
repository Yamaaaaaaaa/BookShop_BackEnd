import express from "express"
import paymentController from "../controller/paymentController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initPaymentMethodRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie)

    router.get("/payment/get-all-payment",paymentController.handleGetAllPayment)
    router.post("/payment/create-payment",paymentController.handleCreatePayment)
    router.put("/payment/update-payment",paymentController.handleUpdatePayment)
    router.delete("/payment/delete-payment",paymentController.handleDeletePayment)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initPaymentMethodRoutes