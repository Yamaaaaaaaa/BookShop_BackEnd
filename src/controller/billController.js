import billService from "../services/billService"

const handleGetAllBill = async (req, res) => {
    try{
        const data = await billService.getAllBill(req.query)
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

module.exports = {
    handleGetAllBill,
    handleGetABill,
    handleCreateBill
}