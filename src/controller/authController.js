import authService from "../services/authService"
import groupService from "../services/groupService"

const handleCreateUser = async (req, res) => {
    try{
        const userData = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            status: req.body.status,
            groupId: req.body.groupId,
        }
        const data = await authService.createUserService(userData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleGetAllUser = async (req, res) => {
    try{
        const data = await authService.getAllUserService()
        return res.status("200").json({
            status: 1,
            message: "Oke Get User",
            data: data
        })
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleGetUser = async (req, res) => {
    try{
        const userData = {
            id: req.body.id
        }
        const data = await authService.getUserService(userData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleLogin = async (req, res) => {    
    // console.log("User: ",req.user);
    
    try{
        const data = await authService.loginService(req.body)
        
        // Kiểm tra xem nếu đăng nhập thành công thì trả Cookie
        if(data && data.access_token){
            res.cookie("jwt", data.access_token, {httpOnly: true, maxAge: 60*60*1000})
        }

        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleUpdateUser = async (req, res) => {
    try{
        // const userData = {
        //     email: req.body.email,
        //     name: req.body.name,
        //     address: req.body.address,
        // }
        // if(req.groupId) userData.groupId = req.groupId
        const data = await authService.updateUserService(req.body)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleChangePassword = async (req, res) => {
    try{
        const userData = {
            email: req.body.email,
            password: req.body.password,
        }
        const data = await authService.updateUserService(userData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleAdminLogin = async (req, res) => {    
    // console.log("User: ",req.user);
    
    try{
        const data = await authService.loginAdminService(req.body)
        
        // Kiểm tra xem nếu đăng nhập thành công thì trả Cookie
        if(data && data.access_token){
            res.cookie("jwt", data.access_token, {httpOnly: true, maxAge: 60*60*1000})
        }

        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleGetAllGroup = async(req, res) => {
    try{
        const data = await groupService.getAllGroup()
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}
module.exports = {
    handleCreateUser,
    handleLogin,
    handleGetAllUser,
    handleGetUser,
    handleChangePassword,
    handleUpdateUser,
    handleAdminLogin,
    handleGetAllGroup
}