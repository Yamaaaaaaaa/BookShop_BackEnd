import db from '../models/index';
import { Op, where } from 'sequelize';

const getOwnBill = async (query) => {
    //query: userId, 
    try{
        const includeOptions = [
            {
                model: db.Book,
                through: { attributes: ["quantity", "price"] } // Lấy thông tin từ bảng Bill Books
            },
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
                message: "Get User's Bill Successful",
                data: billData
            }
        }
        return {
            status: 0,
            message: "Failed to Get User's Bill",
        }
    }catch(error){
        return {
            status: -1,
            message: "Error from Server (Service)",
        }
    }
}


const getAllBill = async () => {
    //query: userId, 
    try{
        const includeOptions = [
            {
                model: db.Book,
                through: { attributes: ["quantity", "price"] } // Lấy thông tin từ bảng Bill Books
            },
            {model: db.PaymentMethod},
            {model: db.User}
        ]

        const billData = await db.Bill.findAll(
            {
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
    //query: billId, 
    try{
        const includeOptions = [
            {model: db.Book},
            {model: db.User},
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

// Dùng chung cho Admin luôn, vì check User là ở controller rồi
const deleteOwnBill = async(billId) => {    
    try{
        const bill = await db.Bill.findOne({
            where: {id: billId}
        })
        if(bill){
            const checkDeleteBill = await bill.destroy()
            if(checkDeleteBill){
                const findBill_Book = await db.Bill_Book.findAll({
                    where: {billId: billId}
                })
                // console.log("findBill_Book", findBill_Book);
                
                if(findBill_Book.length === 0){
                    return {
                        status: 1,
                        message: "Delete Bill SuccessFul, Bill Hasn't Book",
                    }
                }

                const checkDeleteBill_Book = await db.Bill_Book.destroy({
                    where: {billId: billId}
                })
                if(checkDeleteBill_Book){
                    return {
                        status: 1,
                        message: "Delete Bill SuccessFul",
                        data: checkDeleteBill,
                        dataBillBook: checkDeleteBill_Book,
                    }
                }
            }
        }

        return {
            status: 0,
            message: "Error from Server (Service)",
        }
    }catch(error){
        return {
            status: -1,
            message: "Error from Server (Service)",
        }
    }
}

const updateBill = async (body) => {
    const transaction = await db.sequelize.transaction(); // Bắt đầu transaction

    try {
        const bill = await db.Bill.findOne({
            include: {
                model: db.Book,
                through: { attributes: ["quantity", "price"] }, // Lấy số lượng từ bảng trung gian
            },
            where: { id: body.billId },
            transaction,
        });

        if (!bill) {
            await transaction.rollback();
            return {
                status: 0,
                message: "Bill not found",
            };
        }

        // Kiểm tra stock trước khi cập nhật
        if (body.state === "approved") {
            for (const item of bill.Books) {
                if (parseInt(item.stock) < parseInt(item.Bill_Book.quantity)) {
                    await transaction.rollback();
                    return {
                        status: 0,
                        message: `Book: ${item.title} is out of stock`,
                    };
                }
            }

            // Giảm số lượng sách trong kho
            for (const item of bill.Books) {
                item.stock -= parseInt(item.Bill_Book.quantity);
                await item.save({ transaction });
            }
        } else if (body.state === "cancelled") {
            // Hoàn lại số lượng sách khi hủy đơn
            for (const item of bill.Books) {
                item.stock += parseInt(item.Bill_Book.quantity);
                await item.save({ transaction });
            }
        }

        // Cập nhật trạng thái của hóa đơn
        const dataBillUpdated = await bill.update({ state: body.state }, { transaction });

        await transaction.commit(); // Xác nhận transaction

        return {
            status: 1,
            message: "Update Bill Successful",
            data: dataBillUpdated,
        };
    } catch (error) {
        await transaction.rollback(); // Hủy bỏ transaction nếu có lỗi
        return {
            status: -1,
            message: "Error from Server (Service)",
            error: error.message,
        };
    }
};
module.exports = {
    getAllBill,
    getABill,
    createBill,
    deleteOwnBill,
    getOwnBill, 
    updateBill
}