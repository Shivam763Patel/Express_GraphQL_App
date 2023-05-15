const jwt = require('jsonwebtoken')

const authenticate = async(req,res,next) => {
    const token = req.header.authorization?.split(" ")[1] || ""

    try
    {

        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.verifiedUser = verified.user
        console.log("Successfully, verified",verified)
        next()

    }
    catch(error)
    {

        console.log("Verfication Faild !",error)
        next()
    }
}

module.exports = { authenticate }