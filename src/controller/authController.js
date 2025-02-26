import authService from "../services/authService"
const handleCreateUser = async (req, res) => {
    try{
        const userData = {
            email: req.body.email,
            password: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            status: req.body.status,
            group_id: req.body.group_id,
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
        const data = await authService.getUserService()
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

const handleLogin = async (req, res) => {    
    try{
        const data = await authService.loginService(req.body)
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
        const userData = {
            email: req.body.email,
            name: req.body.name,
            address: req.body.address,
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
const handleDeleteUser = async (req, res) => {
    try{
        const data = await authService.deleteUserService(req.body)
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
    handleDeleteUser
}