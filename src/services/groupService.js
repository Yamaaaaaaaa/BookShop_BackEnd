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

module.exports = {
    getGroupWithRoles
}