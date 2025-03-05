import db from '../models/index';

const getAllSeries = async(query) => {
    try{
        const whereCondition = {}
        if(query){
            
        }
        const limit = query.limit !== undefined ? parseInt(query.limit) : undefined;
        
        const seriesData = await db.Serie.findAll(
            {
                where: whereCondition,
                limit: limit
            }
        )        
        if(seriesData){
            return {
                status: 1,
                message: "Get Series Successful",
                data: seriesData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Series",
        }
    }
}


const getSeriesService = async (seriesData) => {
    try{
        const data = await db.Serie.findOne({
            where: {id: seriesData.id},
        })
        if(data){
            return {
                status: 1,
                message: "Get A Series Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get Series",
            }
        }
    }catch(error){
        return {
            status: "-1",
            message: "Failed to Get Series, try again"
        }
    }
}


const createSeriesService = async (seriesData) => {

    try{
        const data = await db.Serie.create(seriesData);
          
        if(data) {
            return {
                status: 1,
                message: "Create Series Successful",
                data: data
            }
        }else{
            return {
                status: 0,
                message: "Failed to Create Series",
            }
        }
    }catch(error){
        // console.log("Lỗi khi tạo người dùng",error);
        return {
            status: -1,
            message: "Failed to Create Series"
        }
    }
}

const updateSeriesService = async (seriesData) => {
    try{
        const data = await db.Serie.update(
            seriesData,
            {
                where: { id: seriesData.id },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Series Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update Series!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update Series"
        }
    }
}

const deleteSeriesService = async (seriesData) => {    
    try{
        const data = await db.Serie.findOne({
            where: {id: seriesData.id}
        })
        if(data){
            const dataDeleted = await db.Serie.destroy({
                where: {id: seriesData.id}
            })
            return {
                status: 1,
                message: "Deleted Successful"
            }
        }else{
            return {
                status: 0,
                message: "Failed to Delete Series"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete Series"
        }
    }
}

module.exports = {
    getAllSeries,
    getSeriesService,
    createSeriesService,
    updateSeriesService,
    deleteSeriesService
}