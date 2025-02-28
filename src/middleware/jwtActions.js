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


// Các Path không cần check quyền
const nonSecurePaths = ["/", "/auth/register", "/auth/login"]

// Middle Ware Authentication: Chỉ những người dùng nào đăng nhập mới đc đi tiếp (Hoặc là những Path ko cần bảo mật mới đc qua)
const checkUserCookie = (req, res, next) => {
    // console.log("Check Authen Cookie: ", req.cookies.jwt, req.path);
    if(nonSecurePaths.includes(req.path)) return next()
    
    const cookies = req.cookies
    if(cookies && cookies.jwt){
        // Verify token
        let token = cookies.jwt
        let decoded = verifyJWT(token)
        if(decoded){
            req.user = decoded // Truyền user cho ông Controller phía sau(sau khi check middleware xong là tk controller đc hưởng ké cái req này)            
            req.token = token
            // console.log("Decode Completed: ", decoded);
            
            return next()
        }else{
            return res.status(401).json({
                status: -1,
                message: "Not Authenticated User"
            })
        }
    }
    else{
        return res.status(401).json({
            status: -1,
            message: "Not Authenticated User"
        })
    }
}

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