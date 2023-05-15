const  {PostType, CommentType }  = require("./types")
const User  = require("../models/User")
const Post  = require("../models/Post")

const { GraphQLString, GraphQLList} = require("graphql")

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
        console.log("User data",user)
        if(!user || args.password !== user.password)
        {
            throw new Error("Invalid credentials")

        }

        const token = createJwtToken(user)
        console.log("token",token)
        return token
    },

}

const addPost = {

    type: PostType,
    description: "Create a new POST",
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    },

    resolve(parent, args ,{ verifiedUser })
    {
        
        console.log("User data",verifiedUser)
        if(!verifiedUser)
        {
            throw new Error("Unauthorized")

        }

        const post = new Post({
            authorId: verifiedUser._id,
            title: args.title,
            description: args.description
        })

        return post.save()

    },
    

}

module.exports = { register , login , addPost}