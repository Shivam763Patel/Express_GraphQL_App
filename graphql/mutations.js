const { } = require("./types")
const User  = require("../models/User")

const { GraphQLString} = require("graphql")

const { createJwtToken} = require("../utils/auth")

const register = 
{

    type: GraphQLString,

    args:{
        username:  { type: GraphQLString},
        email:  { type: GraphQLString},
        password:  { type: GraphQLString},
        displayName:  { type: GraphQLString},

    },
    async resolve(parent,args)
    {
        const { username, email, password, displayName } = args
        const user = new User({ username, email, password, displayName })

        await user.save()
        console.log("user data",user)
        const token = createJwtToken(user)
        console.log("token",token)
        return token

},


}

const login =
{

    type: GraphQLString,

    args:{
      
        email:  { type: GraphQLString},
        password:  { type: GraphQLString},


    },

    async resolve(parent,args)
    {
        const user = await User.findOne({ email: args.email }).select("+password")
        if(!user || args.password !== user.password)
        {
            throw new Error("Invalid credentials")

        }

        const token = createJwtToken(user)
        console.log("token",token)
        return token
    },

}

module.exports = { register , login}