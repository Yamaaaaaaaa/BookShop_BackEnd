import express from "express"

/**
 * express app
 */
const configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs") //Khai báo: Sử dụng ejs để code HTML
    app.set("views", "./src/views") //Khai báo nơi lưu trữ file ejs

}



module.exports = configViewEngine