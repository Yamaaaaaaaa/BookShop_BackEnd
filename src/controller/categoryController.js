import categoryService from "../services/categoryService"

const handleGetAllCategory = async (req, res) => {

    // Nếu cần, sau này ta chỉ cần lọc những cái condition ta cần, tránh thừa thãi
    const query = req.query
    
    try{
        const data = await categoryService.getAllCategory(query)
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

const handleCreateCategory = async (req, res) => {
    
    try{
        const cateData = {
            name: req.body.name,
            description: req.body.description,
        }
        const data = await categoryService.createCategoryService(cateData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleUpdateCategory = async (req, res) => {
    try{
        const cateData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
        }
        const data = await categoryService.updateCategoryService(cateData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleDeleteCategory = async (req, res) => {
    try{
        const data = await categoryService.deleteCategoryService(req.query)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

module.exports = {
    handleGetAllCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
}