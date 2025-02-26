import jwt from "jsonwebtoken"
require("dotenv").config()

const createJWT = (payload) => {
    let token = null
    try{
        token = jwt.sign(payload, process.env.JWT_SECRET)
    }
    catch(error){
        console.log(error);
    }
    return token
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET
    let payload = null
    try{
        let decoded = jwt.verify(token, key)
        console.log("Decoded JWT: ", decoded);
        payload = decoded
    }catch(error){
        console.log(error);
    }
    return payload
}

module.exports = {
    verifyJWT,
    createJWT
}