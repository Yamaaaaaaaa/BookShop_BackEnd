import db from '../models/index';
import { Op } from 'sequelize';
const getAllBook = async(query) => {    
    try{
        // Set các Object điều kiện
        const whereCondition = {}
        const includeOptions = [
            { model: db.Category },
            { model: db.Publisher },
            { model: db.Author },
            { model: db.Serie },
        ]; // Include mặc định

        // Lấy ra các query: 
        if(query){
            if(query.pin !== undefined) whereCondition.pin = query.pin
            if(query.authorId !== undefined) whereCondition.authorId = query.authorId
            if(query.publisherId !== undefined) whereCondition.publisherId = query.publisherId
            if(query.state !== undefined) whereCondition.state = query.state
            if(query.seriesId !== undefined) whereCondition.seriesId = query.seriesId
            if(query.keyword !== undefined) whereCondition.name = { [Op.regexp]: query.keyword }

            // Xử lý danh sách categoryIds (chuyển về mảng số nguyên)
            if (query.categoryIds) {
                let categoryIds = JSON.parse(query.categoryIds);
                // console.log(categoryIds);

                includeOptions[0].where = {
                    id: { [Op.in]: categoryIds }
                };
            }
        }
        const limit = query.limit !== undefined ? parseInt(query.limit) : undefined;

        // Lấy ra dữ liệu
        const bookData = await db.Book.findAll(
            {
                where: whereCondition,
                limit: limit,
                include: includeOptions
            }
        )   
        // console.log("bookData", bookData);     
        if(bookData){
            return {
                status: 1,
                message: "Get Books Successful",
                data: bookData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Books",
        }
    }
}

const getABook = async (query) => {
    const includeOptions = [
        { model: db.Publisher },
        { model: db.Author },
        { model: db.Serie },
    ]; // Include mặc định
    try{
        const data = await db.Book.findOne({
            where: {id: query.id},
            include: includeOptions
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
        return {
            status: "-1",
            message: "Error from server (Service)"
        }
    }
}

const createBookService = async (bookData, categoriesIds) => {
    try{
        const book  = await db.Book.create(bookData);
          
        if(book) {
            // Thêm vào bảng Book_Category:
            if(categoriesIds && categoriesIds.length > 0){
                // Nhớ là phải convert chuỗi JSON Sang mảng trước khi truyền vô                
                const book_cate = await book.addCategory(JSON.parse(categoriesIds)); // Lúc này mới là [1, 2])
                if(book_cate){
                    return {
                        status: 1,
                        message: "Create Book Successful",
                        data: book,
                        book_cate: book_cate
                    }
                }
                else{
                    return {
                        status: 0,
                        message: "Failed to Create Book: Add Category for Book",
                        data: book
                    }
                }
            }   
            return {
                status: 1,
                message: "Create Book Successful (No Cate)",
                data: book,
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

const updateBookService = async (bookData, categoriesId) => {
    try{
        const bookFind = await db.Book.findOne({
            where: { id: bookData.id },
        });
        
 
        if(bookFind) {
            const book = await db.Book.update(
                bookData,
                {
                    where: { id: bookData.id },
                }
            );
            if(categoriesId && categoriesId.length > 0){
                // Nhớ là phải convert chuỗi JSON Sang mảng trước khi truyền vô                
                const book_cate = await bookFind.setCategories(JSON.parse(categoriesId)); // Lúc này mới là [1, 2])
                if(book_cate){
                    return {
                        status: 1,
                        message: "Updated Book Successful",
                        book_cate: book_cate
                    }
                }
                else{
                    return {
                        status: 0,
                        message: "Failed to Update book: Set New Category for Book",
                    }
                }
            }   
            return {
                status: 1,
                message: "Updated Book Successful (Ko Update Cate)",
                book_cate: book
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update book!: Not Found or other Error",
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
    console.log(bookData);
    
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
    getABook,
    createBookService,
    updateBookService,
    deleteBookService
}