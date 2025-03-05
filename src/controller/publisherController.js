import publisherService from "../services/publisherService"

const handleGetAllPublisher = async (req, res) => {

    // Nếu cần, sau này ta chỉ cần lọc những cái condition ta cần, tránh thừa thãi
    const query = req.query
    
    try{
        const data = await publisherService.getAllPublisher(query)
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

const handleCreatePublisher = async (req, res) => {
    try{
        const pubData = {
            name: req.body.name,
            description: req.body.description,
        }
        const data = await publisherService.createPublisherService(pubData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleUpdatePublisher = async (req, res) => {
    try{
        const pubData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
        }
        const data = await publisherService.updatePublisherService(pubData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleDeletePublisher = async (req, res) => {
    try{
        const data = await publisherService.deletePublisherService(req.body)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

module.exports = {
    handleGetAllPublisher,
    handleCreatePublisher,
    handleUpdatePublisher,
    handleDeletePublisher,
}