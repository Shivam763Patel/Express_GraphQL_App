const {GraphQLList, GraphQLID } = require("graphql")
const {UserType} = require("./types")
const User = require("../models/User")

const users = {

    type: new GraphQLList(UserType),
    description: "Retrive all records of user",
    resolve(parent,args)
    {
        return User.find()
    },
}

const user = 
{
    type: UserType,
    description: "Fetch user by id",
    args: { id: { type: GraphQLID } },

    resolve(parent,args)
    {
        return User.findById(args.id)
    }
 
 

}

module.exports = { users , user }