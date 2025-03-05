import seriesService from "../services/seriesService"

const handleGetAllSeries = async (req, res) => {

    // Nếu cần, sau này ta chỉ cần lọc những cái condition ta cần, tránh thừa thãi
    const query = req.query
    
    try{
        const data = await seriesService.getAllSeries(query)
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

const handleCreateSeries = async (req, res) => {
    
    try{
        const seriesData = {
            name: req.body.name,
            description: req.body.description,
        }
        const data = await seriesService.createSeriesService(seriesData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleUpdateSeries = async (req, res) => {
    try{
        const seriesData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
        }
        const data = await seriesService.updateSeriesService(seriesData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleDeleteSeries = async (req, res) => {
    try{
        const data = await seriesService.deleteSeriesService(req.body)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

module.exports = {
    handleGetAllSeries,
    handleCreateSeries,
    handleUpdateSeries,
    handleDeleteSeries,
}