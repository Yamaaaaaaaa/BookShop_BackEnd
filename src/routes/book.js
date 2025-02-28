import express from "express"
import bookController from "../controller/bookController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initBookRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    router.all("*", jwtActions.checkUserCookie)

    router.get("/book/get-all-book",bookController.handleGetAllBook)
    router.post("/book/create-book",bookController.handleCreateBook)
    router.put("/book/update-book",bookController.handleUpdateBook)
    router.delete("/book/delete-book",bookController.handleDeleteBook)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initBookRoutes