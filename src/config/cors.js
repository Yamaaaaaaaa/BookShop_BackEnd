// Tạo 1 MiddleWare Giải quyết CORS
// Add headers before the routes are defined
require("dotenv").config()
const configCORS = (app) => {
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    
        // Request methods you wish to allow (CHo phép các Method được gọi lên) => Ta có thể xóa bớt các method (phân quyền)
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization' );
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        
        if(req.method === "OPTIONS"){
            res.sendStatus(200)
        }
        // Pass to next layer of middleware
        next();
    });
}
export default configCORS