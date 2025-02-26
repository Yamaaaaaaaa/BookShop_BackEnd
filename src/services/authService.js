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
        console.log("Lỗi khi lấy thông tin người dùng",error);
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
            const access_token = await jwtActions.createJWT(user)
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
        console.log("Lỗi khi tạo người dùng",error);
        return {
            status: "-1",
            message: "Failed to register, try again"
        }
    }
}

const updateUserService = async (userData) => {
    try{
        const data = await db.User.update(
            userData,
            {
                where: { email: userData.email },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update User!",
            }
        }
    }catch(error){
        console.log("Lỗi khi sửa người dùng",error);
        return {
            status: "-1",
            message: "Failed to Update User"
        }
    }
}

const deleteUserService = async (userData) => {
    try{
        const data = await db.User.findOne({
            where: {email: userData.email}
        })
        if(data){
            const dataDeleted = await db.User.destroy({
                where: {email: userData.email}
            })
            return {
                status: 1,
                message: "Deleted Successful"
            }
        }else{
            return {
                status: 0,
                message: "Khong tim thay ng dung"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete User"
        }
    }
}

module.exports = {
    loginService,
    createUserService,
    getAllUserService,
    getUserService,
    updateUserService,
    deleteUserService
}