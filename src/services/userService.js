import { query } from 'express';
import db from '../models/index';

const getCart = async (userID) => {
    // console.log("userID", userID);
    
    try{
        const userCartData = await db.Cart.findAll({
            where: {userID: userID},
            include: [
                {
                    model: db.Book,
                }
            ]
        })        
        if(userCartData){
            return {
                status: 1,
                message: "Get Cart Data Successful",
                data: userCartData
            }
        }
        return {
            status: 0,
            message: "Failed to Get Cart Data",
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Cart Data",
        }
    }
}

const updateCart = async (query) => {
    // console.log("query", query);
    // query: { Cart lưu: UID, BookID => Chỉ cần biết cartID là đc
    //     action: up, down, delete
    //     id: cartId
    // }
    try{
        if(query.action === "delete"){
            const deleteData = await db.Cart.findOne({
                where: {id: query.cartID},
            }) 
            if(deleteData){
                const resDeleteData = await deleteData.destroy()
                // console.log("action: ", query.action, ": Data: ", deleteData);
                   
                if(resDeleteData){
                    return {
                        status: 1,
                        message: "Delete Book on Cart Successful",
                        data: deleteData
                    }
                }
            }
        }
        else if(query.action === "up"){
            const cartData = await db.Cart.findOne({
                where: {id: query.cartID},
                include: [
                    {
                        model: db.Book,
                    }
                ]
            })      
            
            if(cartData && cartData.Book.stock > cartData.quantity){
                cartData.quantity += 1
                // console.log("action: up+", ": OldData: ", cartData.quantity);
                const updateData = await cartData.save() 
                // console.log("action: up+", ": NewData: ", updateData.quantity);
                if(updateData){
                    return {
                        status: 1,
                        message: "Add Book Quantity for Cart Successful",
                        data: updateData
                    }
                } 
            }
        }
        else if(query.action === "down"){
            const cartData = await db.Cart.findOne({
                where: {id: query.cartID},
                include: [
                    {
                        model: db.Book,
                    }
                ]
            })        
            // console.log("action: down-", ": Data: ", cartData);  
            if(cartData && cartData.quantity > 0){
                cartData.quantity -= 1
                if(cartData.quantity === 0){
                    // console.log("action: down-", ": OldData: ", cartData.quantity);
                    const updateData = await cartData.destroy() 
                    if(updateData){
                        return {
                            status: 1,
                            message: "Decrese Book Quantity for Cart Successful (Delete)",
                        }
                    } 
                }
                else{
                    // console.log("action: down-", ": OldData: ", cartData.quantity);
                    const updateData = await cartData.save() 
                    // console.log("action: down-", ": NewData: ", updateData.quantity);
                    if(updateData){
                        return {
                            status: 1,
                            message: "Decrese Book Quantity for Cart Successful",
                            data: updateData
                        }
                    } 
                }
            }
        }
        return {
            status: 0,
            message: "Failed to " + query.action + " on Cart Data",
        }
    }catch(error){
        return {
            status: -1,
            message: "Error From Server",
        }
    }
}

const addToCart = async (query) => {
    // query: bookID, userID => Đầu tiên, tìm bookID, userID, xem nó tk như vậy trong Cart ko 
    // => Có: +1 (Nếu chưa out of Stock)
    // => Ko có: Add thêm vô
    // console.log("QUery add", query.bookId, query.userId);
    
    try{
        const userCartData = await db.Cart.findOne({
            where: {bookId: query.bookId, userId: query.userId},
            include: [
                {
                    model: db.Book,
                }
            ]
        })      
        if(!userCartData)  {  // Ko tìm thấy
            const addToCartData = await db.Cart.create(
                {
                    bookId: query.bookId, 
                    userId: query.userId,
                    quantity: 1
                }
            )    
            if(addToCartData)  {
                return {
                    status: 1,
                    message: "Add Book to Cart Successful (Create)",
                    data: addToCartData
                }
            }
        }
        else{
            // console.log(userCartData.Book);
            
            if(userCartData.quantity < userCartData.Book.stock) userCartData.quantity += 1;
            const addToCartData = await userCartData.save()    
            if(addToCartData)  {
                return {
                    status: 1,
                    message: "Add Book to Cart Successful (Add)",
                    data: addToCartData
                }
            }
        }
        
        return {
            status: 0,
            message: "Failed to Add Book to Cart",
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Add Book to Cart",
        }
    }
}
module.exports = {
    getCart, 
    updateCart,
    addToCart
}