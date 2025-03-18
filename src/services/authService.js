import db from '../models/index';
import jwtActions from "../middleware/jwtActions";
import groupService from "../services/groupService";

const { Op } = require("sequelize");

const getAllUserService = async () => {
    try{
        const data = await db.User.findAll()
        return data
    }catch(error){
        console.log("Lỗi khi lấy thông tin tất cả người dùng",error);
    }
}

const getUserService = async (userData) => {
    try{
        const data = await db.User.findOne({
            where: {id: userData.id},
            include: db.Group
        })
        if(data){
            return {
                status: 1,
                message: "Get User Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get User",
            }
        }
    }catch(error){
        // console.log("Lỗi khi lấy thông tin người dùng",error);
        return {
            status: "-1",
            message: "Failed to Get User, try again"
        }
    }
}

const loginService = async (userData) => {
    try{
        const data = await db.User.findOne({
            where : {email: userData.email, password: userData.password}
        })
        
        if(data) {

        // Gán kèm Role, Permisison ở trong jwt token luôn
        
        // Mã hóa roles/permissions vào JWT nhưng đặt thời gian hết hạn ngắn (ví dụ: 15 phút).
        // hi JWT hết hạn, yêu cầu refresh token để cập nhật lại quyền từ database.
            let groupWithRoles = await groupService.getGroupWithRoles(data)
            let payload = {
                id: data.id,
                email: data.email,
                name: data.name,
                groupWithRoles: groupWithRoles,
                expireIn: process.env.JWT_EXPIRED_IN //60ms
            }
            
            const access_token = jwtActions.createJWT(payload)
            return {
                status: 1,
                message: "Login Successful",
                access_token: access_token,
                groupWithRoles: groupWithRoles,
                data: data
            }
        }else{
            return {
                status: 0,
                message: "Email or Password is Incorrect, Please enter again!",
            }
        }
    }catch(error){
        console.log("Lỗi khi lấy thông tin người dùng",error);
        return {
            status: -1,
            message: "Failed to login, try again"
        }
    }
}

const createUserService = async (userData) => {
    try{
        const [user, created] = await db.User.findOrCreate({
            where: { 
                [Op.or]: [
                    { email: userData.email },
                    { phone: userData.phone }
                ]
            },
            defaults: userData
        });
          
        if(created) {
            console.log("User: ",user);
            let groupWithRoles = await groupService.getGroupWithRoles(user)
            let payload = {
                id: user.id,
                email: user.email,
                name: user.name,
                groupWithRoles: groupWithRoles,
                expireIn: process.env.JWT_EXPIRED_IN //60ms
            }
            
            const access_token = jwtActions.createJWT(payload)

            return {
                status: 1,
                access_token: access_token,
                message: "Register Successful",
                data: user
            }
        }else{
            return {
                status: 0,
                message: "Email or Phone is already exist!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi tạo người dùng",error);
        return {
            status: -1,
            message: "Failed to register, try again"
        }
    }
}

const updateUserService = async (userData) => {
    console.log("userData", userData);
    
    try{
        const checkUser = await db.User.findOne({
            where: {id: userData.id}
        })
        if(checkUser){
            if(userData.name){
                checkUser.name = userData.name
            }
            if(userData.phone){
                checkUser.phone = userData.phone
            }
            if(userData.address){
                checkUser.address = userData.address
            }
            if(userData.groupId){
                checkUser.groupId = userData.groupId
            }
            const data = await checkUser.save();
              
            if(data) {
                return {
                    status: 1,
                    message: "Updated Successful",
                    data: data
                }
            }
            return {
                status: 0,
                message: "Failed to Update User!",
            }
        }
        return {
            status: 0,
            message: "Failed to Update User! (User not Found)",
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update User"
        }
    }
}


const loginAdminService = async (userData) => {
    try{
        const data = await db.User.findOne({
            where : {email: userData.email, password: userData.password}
        })
        
        if(data) {
            // Kiểm tra người dùng có Role /admin/login không
            // Việc kiểm tra này là cho đảm bảo quá trình chạy ko vấn đề
            // Nếu trường hợp ng dùng đổi API mà login bằng Client thì ko sao, Middleware sẽ chặn các API khác nhờ Cookie đã gửi sau khi login. Đăng nhập thôi là chưa xong đâu kkk

            let groupWithRoles = await groupService.getGroupWithRoles(data)
            const checkAdminLogin = groupWithRoles.Roles.some(item => item.url === "/auth/admin/login")
            if(checkAdminLogin) {
                // Gán kèm Role, Permisison ở trong jwt token luôn
                
                // Mã hóa roles/permissions vào JWT nhưng đặt thời gian hết hạn ngắn (ví dụ: 15 phút).
                // hi JWT hết hạn, yêu cầu refresh token để cập nhật lại quyền từ database.
                let payload = {
                    id: data.id,
                    email: data.email,
                    name: data.name,
                    groupWithRoles: groupWithRoles,
                    expireIn: process.env.JWT_EXPIRED_IN //60ms
                }
                
                const access_token = jwtActions.createJWT(payload)
                return {
                    status: 1,
                    message: "Login Successful",
                    access_token: access_token,
                    groupWithRoles: groupWithRoles,
                    data: data
                }
            }
            else{
                return {
                    status: 0,
                    message: "You are not Admin",
                    groupWithRoles: groupWithRoles,
                    data: data
                }
            }
        }else{
            return {
                status: 0,
                message: "Email or Password is Incorrect, Please enter again!",
            }
        }
    }catch(error){
        console.log("Lỗi khi lấy thông tin người dùng",error);
        return {
            status: -1,
            message: "Failed to login, try again"
        }
    }
}

module.exports = {
    loginService,
    createUserService,
    getAllUserService,
    getUserService,
    updateUserService,
    loginAdminService
}