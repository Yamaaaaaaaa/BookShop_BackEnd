import authorService from "../services/authorService"

const handleGetAllAuthor = async (req, res) => {

    // Nếu cần, sau này ta chỉ cần lọc những cái condition ta cần, tránh thừa thãi
    const query = req.query
    // console.log("Query: ", query);
    
    try{
        const data = await authorService.getAllAuthor(query)
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

const handleCreateAuthor = async (req, res) => {
    
    try{
        const AuthorData = {
            name: req.body.name,
            description: req.body.description,
        }
        const data = await authorService.createAuthorService(AuthorData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleUpdateAuthor = async (req, res) => {
    try{
        const AuthorData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
        }
        const data = await authorService.updateAuthorService(AuthorData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleDeleteAuthor = async (req, res) => {
    try{
        const data = await authorService.deleteAuthorService(req.body)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

module.exports = {
    handleGetAllAuthor,
    handleCreateAuthor,
    handleUpdateAuthor,
    handleDeleteAuthor,
}