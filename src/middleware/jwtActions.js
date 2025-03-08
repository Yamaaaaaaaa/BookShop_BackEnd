import jwt from "jsonwebtoken"
require("dotenv").config()

const createJWT = (payload) => {
    let token = null
    try{
        token = jwt.sign(payload, process.env.JWT_SECRET)
    }
    catch(error){
        console.log(error);
    }
    return token
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try{
        let decoded = jwt.verify(token, key)
        // console.log("Decoded JWT: ", decoded);
        data = decoded
    }catch(error){
        console.log(error);
    }
    return data
}


const nonSecurePaths = ["/", "/auth/register", "/auth/login", "/book/get-all-book", "/category/get-all-category", "/publisher/get-all-publisher"]

const checkUserCookie = (req, res, next) => {
    try {
        if (nonSecurePaths.includes(req.path)) {
            return next(); // ✅ Đảm bảo return để không chạy tiếp
        }

        const cookies = req.cookies;
        if (!cookies || !cookies.jwt) {
            return res.status(401).json({
                status: -1,
                message: "Not Authenticated User"
            });
        }

        let token = cookies.jwt;
        let decoded;
        try {
            decoded = verifyJWT(token); // ✅ Bọc verify để tránh lỗi ngoài ý muốn
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({
                status: -1,
                message: "Invalid Token"
            });
        }

        if (!decoded) {
            return res.status(401).json({
                status: -1,
                message: "Not Authenticated User"
            });
        }

        req.user = decoded;
        req.token = token;

        return next(); // ✅ Return để đảm bảo không chạy tiếp middleware sau khi gọi next()
    } catch (error) {
        console.error("Middleware Error:", error);
        if (!res.headersSent) { // ✅ Kiểm tra nếu response chưa gửi
            return res.status(500).json({
                status: -1,
                message: "Internal Server Error"
            });
        }
    }
};


// Middleware Authorization:
    // Cách tối ưu việc nên Để Role kèm trong Token => Req rồi check hoặc Check User => Role trong BE, Token chỉ lưu User ID
    
    // Mã hóa roles/permissions vào JWT nhưng đặt thời gian hết hạn ngắn (ví dụ: 15 phút).
    // Khi JWT hết hạn, yêu cầu refresh token để cập nhật lại quyền từ database.
const checkUserPermission = (req, res, next) =>{
    if(nonSecurePaths.includes(req.path)) return next()

    // Lấy ra User được đính kèm ở Middleware Authen bên trên qua req.
    if(req.user){
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles
        let currentURL = req.path

        if(!roles || roles.length === 0){
            return res.status(403).json({
                EC: -1,
                DT: "",
                EM: "You don't permission to access this resource..."
            })
        }
        else{
            // Check các path được quyền: 
            let canAccess = roles.some(item => item.url === currentURL)
            // console.log("roles", roles);
            // console.log("currentURL", currentURL);
            // console.log("canAccess", canAccess);
            if(canAccess === true){
                next()
            }
            else{
                return res.status(403).json({
                    EC: -1,
                    DT: "",
                    EM: "You don't permission to access this resource..."
                })
            }
        }
    }else{
        return res.status(401).json({
            EC: -1,
            DT: "",
            EM: "Not Authenticated User"
        })
    }
}

module.exports = {
    verifyJWT,
    createJWT,
    checkUserCookie,
    checkUserPermission
}