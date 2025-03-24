import express from "express"
import wishlistController from "../controller/wishlistController";
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initWishListRoutes = (app) => {
    router.get("/wish-list/get-wish-list",wishlistController.handleGetWishList)
    router.post("/wish-list/add-book-to-wish-list",wishlistController.handleAddBookToWishList)
    // router.put("/wish-list/update-wish-list",wishlistController.handleUpdateAuthor)
    router.delete("/wish-list/delete-book-in-wish-list",wishlistController.handleDeleteBookInWishList)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initWishListRoutes