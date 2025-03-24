import db from '../models/index';

const getAllAuthor = async(query) => {
    try{
        const whereCondition = {}
        if(query){
        }
        const limit = query.limit !== undefined ? parseInt(query.limit) : undefined;
        
        const AuthorData = await db.Author.findAll(
            {
                where: whereCondition,
                limit: limit
            }
        )        
        if(AuthorData){
            return {
                status: 1,
                message: "Get Author Successful",
                data: AuthorData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Author",
        }
    }
}


const getAuthorService = async (AuthorData) => {
    try{
        const data = await db.Author.findOne({
            where: {id: AuthorData.id},
        })
        if(data){
            return {
                status: 1,
                message: "Get A Author Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get Author",
            }
        }
    }catch(error){
        return {
            status: "-1",
            message: "Failed to Get Author, try again"
        }
    }
}


const createAuthorService = async (AuthorData) => {

    try{
        const data = await db.Author.create(AuthorData);
          
        if(data) {
            return {
                status: 1,
                message: "Create Author Successful",
                data: data
            }
        }else{
            return {
                status: 0,
                message: "Failed to Create Author",
            }
        }
    }catch(error){
        // console.log("Lỗi khi tạo người dùng",error);
        return {
            status: -1,
            message: "Failed to Create Author"
        }
    }
}

const updateAuthorService = async (AuthorData) => {
    try{
        const data = await db.Author.update(
            AuthorData,
            {
                where: { id: AuthorData.id },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Author Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update Author!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update Author"
        }
    }
}

const deleteAuthorService = async (AuthorData) => {    
    try{
        const data = await db.Author.findOne({
            where: {id: AuthorData.id}
        })
        if(data){
            const dataDeleted = await db.Author.destroy({
                where: {id: AuthorData.id}
            })
            return {
                status: 1,
                message: "Deleted Successful"
            }
        }else{
            return {
                status: 0,
                message: "Failed to Delete Author"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete Author"
        }
    }
}

module.exports = {
    getAllAuthor,
    getAuthorService,
    createAuthorService,
    updateAuthorService,
    deleteAuthorService
}