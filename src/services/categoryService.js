import db from '../models/index';

const getAllCategory = async(query) => {
    
    try{
        const whereCondition = {}
        // if(query){
            
        // }
        
        const limit = query.limit !== undefined ? parseInt(query.limit) : undefined;

        
        const cateData = await db.Category.findAll(
            // {
            //     where: whereCondition,
            //     // limit: limit
            // }
        )        
        if(cateData){
            return {
                status: 1,
                message: "Get Categories Successful",
                data: cateData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Categories",
        }
    }
}


const getCategoryService = async (cateData) => {
    try{
        const data = await db.Category.findOne({
            where: {id: cateData.id},
        })
        if(data){
            return {
                status: 1,
                message: "Get A Category Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get Category",
            }
        }
    }catch(error){
        // console.log("Lỗi khi lấy thông tin người dùng",error);
        return {
            status: "-1",
            message: "Failed to Get Category, try again"
        }
    }
}


const createCategoryService = async (cateData) => {
    try{
        const data = await db.Category.create(cateData);
          
        if(data) {
            return {
                status: 1,
                message: "Create Category Successful",
                data: data
            }
        }else{
            return {
                status: 0,
                message: "Failed to Create Category",
            }
        }
    }catch(error){
        // console.log("Lỗi khi tạo người dùng",error);
        return {
            status: -1,
            message: "Failed to Create Category"
        }
    }
}

const updateCategoryService = async (cateData) => {
    try{
        const data = await db.Category.update(
            cateData,
            {
                where: { id: cateData.id },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Category Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update Category!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update Category"
        }
    }
}

const deleteCategoryService = async (cateData) => {
    
    try{
        const data = await db.Category.findOne({
            where: {id: cateData.id}
        })
        if(data){
            const dataDeleted = await db.Category.destroy({
                where: {id: cateData.id}
            })
            return {
                status: 1,
                message: "Deleted Successful"
            }
        }else{
            return {
                status: 0,
                message: "Failed to Delete Category"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete Category"
        }
    }
}

module.exports = {
    getAllCategory,
    getCategoryService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
}