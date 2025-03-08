import userService from "../services/userService"
const handleGetProfile = () => {

}

const handleGetCart = async (req, res) => {
    try{
        const data = await userService.getCart(req.query.userId)
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

const handleUpdateCart = async (req, res) => {
    try{
        const data = await userService.updateCart(req.query)
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

const handleAddToCart = () => {
    
}

module.exports = {
    handleGetProfile,
    handleGetCart,
    handleUpdateCart,
    handleAddToCart
}