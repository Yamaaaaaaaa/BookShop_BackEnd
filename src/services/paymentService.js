import db from '../models/index';

const getAllPayment = async(query) => {
    try{
        const whereCondition = {}
        // if(query){
            
        // }
        const limit = query.limit !== undefined ? parseInt(query.limit) : undefined;

        
        const pubData = await db.PaymentMethod.findAll(
            {
                where: whereCondition,
                limit: limit
            }
        )        
        if(pubData){
            return {
                status: 1,
                message: "Get Payment Methods Successful",
                data: pubData
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Payment Methods",
        }
    }
}


const getPaymentService = async (pubData) => {
    try{
        const data = await db.PaymentMethod.findOne({
            where: {id: pubData.id},
        })
        if(data){
            return {
                status: 1,
                message: "Get A PaymentMethod Successful",
                data: data
            }
        }
        else{
            return {
                status: 0,
                message: "Failed to Get PaymentMethod",
            }
        }
    }catch(error){
        return {
            status: "-1",
            message: "Failed to Get PaymentMethod, try again"
        }
    }
}

const createPaymentService = async (pubData) => {
    try{
        const data = await db.PaymentMethod.create(pubData);
          
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

const updatePaymentService = async (pubData) => {
    try{
        const data = await db.PaymentMethod.update(
            pubData,
            {
                where: { id: pubData.id },
            }
        );
          
        if(data) {
            return {
                status: 1,
                message: "Updated Payment Successful",
            }
        }else{
            return {
                status: 0,
                message: "Failed to Update Payment!",
            }
        }
    }catch(error){
        // console.log("Lỗi khi sửa người dùng",error);
        return {
            status: -1,
            message: "Failed to Update Payment"
        }
    }
}

const deletePaymentService = async (pubData) => {    
    try{
        const data = await db.PaymentMethod.findOne({
            where: {id: pubData.id}
        })
        if(data){
            const dataDeleted = await db.PaymentMethod.destroy({
                where: {id: pubData.id}
            })
            return {
                status: 1,
                message: "Deleted Payment Successful"
            }
        }else{
            return {
                status: 0,
                message: "Failed to Delete Payment"
            }
        }
    }catch(error){
        return {
            status: -1,
            message: "Failed to Delete Payment"
        }
    }
}

module.exports = {
    getAllPayment,
    getPaymentService,
    createPaymentService,
    updatePaymentService,
    deletePaymentService
}