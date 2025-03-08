import express from "express"
import categoryController from "../controller/categoryController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initCategoryRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie)

    router.get("/category/get-all-category",categoryController.handleGetAllCategory)
    router.post("/category/create-category",categoryController.handleCreateCategory)
    router.put("/category/update-category",categoryController.handleUpdateCategory)
    router.delete("/category/delete-category",categoryController.handleDeleteCategory)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initCategoryRoutes