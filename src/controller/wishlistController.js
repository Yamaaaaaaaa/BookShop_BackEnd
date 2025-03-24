import wishlistService from "../services/wishlistService"

const handleGetWishList = async (req, res) => {
    try{
        const data = await wishlistService.getWishList(req.query.userId)
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
const handleAddBookToWishList = async(req, res) => {
    try{
        const data = await wishlistService.addToWishList(req.body)
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

const handleDeleteBookInWishList = async(req, res) => {
    try{
        const data = await wishlistService.deleteInWishList(req.query)
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
    handleGetWishList,
    handleAddBookToWishList,
    handleDeleteBookInWishList
}