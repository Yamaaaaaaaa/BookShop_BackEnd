import express from "express"
import authorController from "../controller/authorController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initAuthorRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie)

    router.get("/author/get-all-author",authorController.handleGetAllAuthor)
    router.post("/author/create-author",authorController.handleCreateAuthor)
    router.put("/author/update-author",authorController.handleUpdateAuthor)
    router.delete("/author/delete-author",authorController.handleDeleteAuthor)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initAuthorRoutes