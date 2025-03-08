import express from "express"
import seriesController from "../controller/seriesController";
import jwtActions from "../middleware/jwtActions"
const router = express.Router();


// Định nghĩa các Route sẽ sử dụng
const initSeriesRoutes = (app) => {
    // All Cookie Must PassAway this middleware: Authen and Authorize
    // router.all("*", jwtActions.checkUserCookie)

    router.get("/series/get-all-series",seriesController.handleGetAllSeries)
    router.post("/series/create-series",seriesController.handleCreateSeries)
    router.put("/series/update-series",seriesController.handleUpdateSeries)
    router.delete("/series/delete-series",seriesController.handleDeleteSeries)

    return app.use("/api/v1", router) //Nạp các Router, mặc định bắt đầu là cái tham số đầu ấy (VD: /abc => /abc/about thì mới vào about) => Nên để mặc định "/"
}

module.exports = initSeriesRoutes