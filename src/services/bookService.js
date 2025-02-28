import db from '../models/index';

const getAllBook = async() => {
    try{
        const bookData = await db.Book.findAll()        
        if(bookData){
            return {
                status: 1,
                message: "Failed to Get All Book",
                data: bookData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get All Book",
        }
    }
}


const getBookService = async (bookData) => {
    try{
        const data = await db.Book.findOne({
            where: {id: bookData.id},
        })
        if(data){
            return {
                status: 1,
                message: "Get A Book Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get book",
            }
        }
    }catch(error){
        // console.log("Lỗi khi lấy thông tin người dùng",error);
        return {
            status: "-1",
            message: "Failed to Get book, try again"
        }
    }
}


const createBookService = async (bookData) => {
    console.log("bookData", bookData);

    try{
        const data = await db.Book.create(bookData);
          
        if(data) {
            return {
                status: 1,
                message: "Create Book Successful",
                data: data
            }
        }else{
            return {
                status: 0,
                message: "Failed to Create Book",
            }
        }
    }catch(error){
        // console.log("Lỗi khi tạo người dùng",error);
        return {
            status: -1,
            message: "Failed to Create Book"
        }
    }
}

const updateBookService = async (bookData) => {
    try{
        const data = await db.Book.update(
            bookData,
            {
                where: { id: bookData.id },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Book Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update book!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update book"
        }
    }
}

const deleteBookService = async (bookData) => {
    console.log("bookData delete: ", bookData);
    
    try{
        const data = await db.Book.findOne({
            where: {id: bookData.id}
        })
        if(data){
            const dataDeleted = await db.Book.destroy({
                where: {id: bookData.id}
            })
            return {
                status: 1,
                message: "Deleted Successful"
            }
        }else{
            return {
                status: 0,
                message: "Failed to Delete book"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete book"
        }
    }
}

module.exports = {
    getAllBook,
    getBookService,
    createBookService,
    updateBookService,
    deleteBookService
}