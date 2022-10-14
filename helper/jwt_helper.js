const jwt = require('jsonwebtoken')
const createError = require('http-errors')



module.exports = {
    signAccessToken: (userId)=>{
        return new Promise((resolve, reject)=>{
            const payload = {
                name: "aditya",
                //exp: new Date()
            }
            const sercret = "super secret"
            const options = {
                expiresIn: '1h'

            }
            jwt.sign(payload, sercret, options, (error, token)=>{
                if(error) reject(error)
                resolve(token)
            })
        })
    }
}