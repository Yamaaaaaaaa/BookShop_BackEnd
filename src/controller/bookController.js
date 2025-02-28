import bookService from "../services/bookService"

const handleGetAllBook = async (req, res) => {
    try{
        const data = await bookService.getAllBook()
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

const handleCreateBook = async (req, res) => {
    
    try{
        const bookData = {
            name: req.body.name,
            description: req.body.description,
            originalCost: req.body.originalCost,
            sale: req.body.sale,
            stock: req.body.stock,
            publisherId: req.body.publisherId,
            authorId: req.body.authorId,
            state: req.body.state,
            publishedDate: req.body.publishedDate,
            seriesId: req.body.seriesId,
            bookImageUrl: req.body.bookImageUrl
        }
        const data = await bookService.createBookService(bookData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}


const handleUpdateBook = async (req, res) => {
    try{
        const bookData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            originalCost: req.body.originalCost,
            sale: req.body.sale,
            stock: req.body.stock,
            publisherId: req.body.publisherId,
            authorId: req.body.authorId,
            state: req.body.state,
            publishedDate: req.body.publishedDate,
            seriesId: req.body.seriesId,
            bookImageUrl: req.body.bookImageUrl
        }
        const data = await bookService.updateBookService(bookData)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}

const handleDeleteBook = async (req, res) => {
    try{
        const data = await bookService.deleteBookService(req.body)
        return res.status("200").json(data)
    }catch(error){
        return res.status("500").json({
            status: -1,
            message: "Error From Server"
        })
    }
}
module.exports = {
    handleGetAllBook,
    handleCreateBook,
    handleUpdateBook,
    handleDeleteBook,
}