import express from "express"
import billController from "../controller/billController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initBillRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie)

    router.get("/bill/get-all-bill",billController.handleGetAllBill)
    router.get("/bill/get-a-bill",billController.handleGetABill)
    router.post("/bill/create-bill",billController.handleCreateBill)


    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initBillRoutes