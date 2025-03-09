import db from '../models/index';
import { Op } from 'sequelize';

const getAllBill = async (query) => {
    //query: userId, 
    try{
        const includeOptions = [
            {model: db.Book},
            {model: db.PaymentMethod}
        ]

        const whereOptions = {}
        if(query){
            if(query.userId) whereOptions.userId = query.userId
        }
        const billData = await db.Bill.findAll(
            {
                where: whereOptions,
                include: includeOptions
            }
        );
        
        if(billData){
            return {
                status: 1,
                message: "Get All Bill Successful",
                data: billData
            }
        }
        return {
            status: 0,
            message: "Failed to Get All Bill",
        }
    }catch(error){
        return {
            status: -1,
            message: "Error from Server (Service)",
        }
    }
}


const getABill = async (query) => {
    //query: userId, 
    try{
        const includeOptions = [
            {model: db.Book},
            {model: db.PaymentMethod}
        ]

        const whereOptions = {}
        if(query){
            if(query.billId) whereOptions.id = query.billId
        }
        const billData = await db.Bill.findOne(
            {
                where: whereOptions,
                include: includeOptions
            }
        );
        
        if(billData){
            return {
                status: 1,
                message: "Get A Bill Successful",
                data: billData
            }
        }
        return {
            status: 0,
            message: "Failed to Get A Bill",
        }
    }catch(error){
        return {
            status: -1,
            message: "Error from Server (Service)",
        }
    }
}
const createBill = async (body) => {
    // console.log("body", body);
    
    const user = typeof body.user === "string" ? JSON.parse(body.user) : body.user;
    // console.log("user", user);
    
    const billData = {
        userId: user.id,
        paymentMethodId: body.paymentMethodId,
        deliveryAddress: user.address,
        deliveryPhone: user.phone,
        totalCost: body.totalCost,
        state: "pending",
        shippingMethod: body.shippingMethod,
    }
    const booksData = typeof body.books === "string" ? JSON.parse(body.books) : body.books;
    
    // console.log("booksData", booksData);
    
    try{
        const bill = await db.Bill.create(billData)
        if(bill){
            if(booksData && booksData.length > 0){
                // const dataBill = await bill.addBooks(bookIDs): Làm kiểu này lỗi nhé, vì nó không thêm được các cái thông tin đi kèm quantity, price)
                // 2. Tạo danh sách Bill_Book từ books[]
                const billBooks = booksData.map((book) => ({
                    billId: bill.id,
                    bookId: book.id,
                    quantity: book.quantity,
                }));

                // Trước đó, nhớ check xem Book còn tồn tại hay ko nhé :v (lười nên chưa lm)
                const dataBill = await db.Bill_Book.bulkCreate(billBooks);
                
                if(dataBill){
                    return {
                        status: 1,
                        message: "Create Bill Successful",
                        data: bill,
                        books: dataBill
                    }
                }
            }
            else{
                return {
                    status: 1,
                    message: "Create Bill Successful, but Bill Hasn't Books",
                    data: bill
                }
            }
        }
        return {
            status: 0,
            message: "Failed to Create Bill",
        }
    }catch(error){
        return {
            status: -1,
            message: "Error from Server (Service)",
        }
    }
}
module.exports = {
    getAllBill,
    getABill,
    createBill
}