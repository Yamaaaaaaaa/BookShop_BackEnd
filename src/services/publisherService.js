import db from '../models/index';

const getAllPublisher = async(query) => {
    
    try{
        const whereCondition = {}
        // if(query){
            
        // }
        
        const limit = query.limit !== undefined ? parseInt(query.limit) : undefined;

        
        const pubData = await db.Publisher.findAll(
            {
                where: whereCondition,
                limit: limit
            }
        )        
        if(pubData){
            return {
                status: 1,
                message: "Get Publishers Successful",
                data: pubData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Publishers",
        }
    }
}


const getPublisherService = async (pubData) => {
    try{
        const data = await db.Publisher.findOne({
            where: {id: pubData.id},
        })
        if(data){
            return {
                status: 1,
                message: "Get A Publisher Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get Publisher",
            }
        }
    }catch(error){
        return {
            status: "-1",
            message: "Failed to Get Publisher, try again"
        }
    }
}


const createPublisherService = async (pubData) => {

    try{
        const data = await db.Publisher.create(pubData);
          
        if(data) {
            return {
                status: 1,
                message: "Create Publisher Successful",
                data: data
            }
        }else{
            return {
                status: 0,
                message: "Failed to Create Publisher",
            }
        }
    }catch(error){
        // console.log("Lỗi khi tạo người dùng",error);
        return {
            status: -1,
            message: "Failed to Create Publisher"
        }
    }
}

const updatePublisherService = async (pubData) => {
    try{
        const data = await db.Publisher.update(
            pubData,
            {
                where: { id: pubData.id },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Publisher Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update Publisher!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update Publisher"
        }
    }
}

const deletePublisherService = async (pubData) => {    
    try{
        const data = await db.Publisher.findOne({
            where: {id: pubData.id}
        })
        if(data){
            const dataDeleted = await db.Publisher.destroy({
                where: {id: pubData.id}
            })
            return {
                status: 1,
                message: "Deleted Successful"
            }
        }else{
            return {
                status: 0,
                message: "Failed to Delete Publisher"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete Publisher"
        }
    }
}

module.exports = {
    getAllPublisher,
    getPublisherService,
    createPublisherService,
    updatePublisherService,
    deletePublisherService
}