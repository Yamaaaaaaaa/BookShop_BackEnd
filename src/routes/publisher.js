import express from "express"
import publisherController from "../controller/publisherController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initPublisherRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie)

    router.get("/publisher/get-all-publisher",publisherController.handleGetAllPublisher)
    router.post("/publisher/create-publisher",publisherController.handleCreatePublisher)
    router.put("/publisher/update-publisher",publisherController.handleUpdatePublisher)
    router.delete("/publisher/delete-publisher",publisherController.handleDeletePublisher)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initPublisherRoutes