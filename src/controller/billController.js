import billService from "../services/billService"

const handleGetAllBill = async (req, res) => {
    try{
        const data = await billService.getAllBill()
        if(data){
            return res.status(200).json(data)
        }
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}

const handleGetOwnBill = async (req, res) => {
    try{
        const data = await billService.getOwnBill(req.query)
        if(data){
            return res.status(200).json(data)
        }
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}
const handleGetABill = async (req, res) => {
    try{
        const data = await billService.getABill(req.query)
        if(data){
            return res.status(200).json(data)
        }
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}
const handleCreateBill = async (req, res) => {
    // console.log("reqbody", req.body.user);
    
    try{
        const data = await billService.createBill(req.body)
        if(data){
            return res.status(200).json(data)
        }
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}

const handleDeleteOwnBill = async (req, res) => {
    console.log("UID",+req.user.id);
    console.log("UIDqr",+req.query.userId);
    
    
    try{
        if(+req.user.id === +req.query.userId){
            const data = await billService.deleteOwnBill(req.query.billId)
            if(data){
                return res.status(200).json(data)
            }
        }
        return res.status(500).json({
            status: -1,
            message: "Error from server (Ng dùng ko trung với Cookie)" //Mes để tam
        })
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}
const handleDeleteBill = async (req, res) => {
    try{
        const data = await billService.deleteOwnBill(req.query.billId)
        if(data){
            return res.status(200).json(data)
        }
        return res.status(500).json({
            status: -1,
            message: "Error from server" //Mes để tam
        })
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}

const handleUpdateBill = async (req, res) => {
    console.log("State",req.body.state);
    console.log("BillID",req.body.billId);
    try{
        const data = await billService.updateBill(req.body)
        if(data){
            return res.status(200).json(data)
        }
        return res.status(500).json({
            status: -1,
            message: "Error from server" //Mes để tam
        })
    }catch (error){
        return res.status(500).json({
            status: -1,
            message: "Error from server" + error
        })
    }
}
module.exports = {
    handleGetAllBill,
    handleGetABill,
    handleCreateBill,
    handleDeleteOwnBill,
    handleGetOwnBill,
    handleDeleteBill,
    handleUpdateBill
}