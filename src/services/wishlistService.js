import { query } from 'express';
import db from '../models/index';

const getWishList = async (userID) => {
    // console.log("userID", userID);
    
    try{
        const userCartData = await db.WishList.findAll({
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

const addToWishList = async (query) => {
    // query: bookID, userID => Đầu tiên, tìm bookID, userID, xem nó tk như vậy trong Cart ko 
    console.log("book", query.bookId);
    console.log("userId", query.userId);
    
    try{
        const userCartData = await db.WishList.findOne({
            where: {bookId: query.bookId, userId: query.userId},
            include: [
                {
                    model: db.Book,
                }
            ]
        })      
        if(!userCartData)  {  // Ko tìm thấy
            const addToCartData = await db.WishList.create(
                {
                    bookId: query.bookId, 
                    userId: query.userId,
                }
            )    
            if(addToCartData)  {
                return {
                    status: 1,
                    message: "Add Book to Wish List Successful (Create)",
                    data: addToCartData
                }
            }
            else{
                return {
                    status: 0,
                    message: "Failed to Add Book to WishList",
                }
            }
        }
        
        return {
            status: 0,
            message: "Book has been existed in your Wish List",
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Add Book to WishList",
        }
    }
}

const deleteInWishList = async (query) => {
    let whereCondition = {}
    
    if(query.listId) {
        whereCondition.id = query.listId
    }
    else{
        if(query.userId) {
            whereCondition.userId = query.userId
        }
        if(query.bookId) {
            whereCondition.bookId = query.bookId
        }
    }
    
    try{
        const deleteData = await db.WishList.findOne({
            where: whereCondition,
        }) 
        if(deleteData){
            const resDeleteData = await deleteData.destroy()
            // console.log("action: ", query.action, ": Data: ", deleteData);
                
            if(resDeleteData){
                return {
                    status: 1,
                    message: "Delete Book on WishList Successful",
                    data: deleteData
                }
            }
        }
        return {
            status: 0,
            message: "Book Not Found in Your Wish List",
        }
    }catch{
        return {
            status: -1,
            message: "Failed to Delete Book to On WishList",
        }
    }
}
module.exports = {
    getWishList,
    addToWishList,
    deleteInWishList
}