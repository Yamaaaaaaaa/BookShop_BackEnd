import paymentService from "../services/paymentService"

const handleGetAllPayment = async (req, res) => {

    // Nếu cần, sau này ta chỉ cần lọc những cái condition ta cần, tránh thừa thãi
    const query = req.query
    
    try{
        const data = await paymentService.getAllPayment(query)
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

const handleCreatePayment = async (req, res) => {
    try{
        const pubData = {
            name: req.body.name,
            description: req.body.description,
            qrUrl: req.body.qrUrl
        }
        const data = await paymentService.createPaymentService(pubData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleUpdatePayment = async (req, res) => {
    try{
        const pubData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            qrUrl: req.body.qrUrl
        }
        const data = await paymentService.updatePaymentService(pubData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleDeletePayment = async (req, res) => {
    try{
        const data = await paymentService.deletePaymentService(req.query)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

module.exports = {
    handleGetAllPayment,
    handleCreatePayment,
    handleUpdatePayment,
    handleDeletePayment,
}