import db from '../models/index';

const getGroupWithRoles = async (userData) => {
    const role = await db.Group.findOne({
        where: {id: userData.groupId},
        attribute: ["id", "name", "description"],
        include : {
            model: db.Role,
            attribute: ["id", "url", "name"], 
            through: {attribute: []}
        }
    })
    return role ? role: {}
}

const getAllGroup = async (userData) => {
    try{
        const group = await db.Group.findAll()
        if(group){
            return {
                status: 1,
                message: "Get Author Successful",
                data: group
            }
        }
        
    }catch(error){
        return {
            status: -1,
            message: "Failed to Get Author",
        }
    }
    
}

module.exports = {
    getGroupWithRoles,
    getAllGroup
}