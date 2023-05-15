const jwt = require("jsonwebtoken")

const jwt_secret=process.env.JWT_SECRET || 'tigunnew'

console.log("data one",jwt_secret)

const createJwtToken = (user) => 
{
    console.log("new data")
    return jwt.sign(user.toJSON(), `${process.env.JWT_SECRET}`,
    {

        expiresIn: process.env.JWT_EXPIRES_IN 
    })


}


module.exports = { createJwtToken }

