const { GraphQLObjectType, GraphQLID, GraphQLString} = require("graphql")
const { } = require("graphql")


const { User } = require("../models/User")

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    
    fields: () => ({

        id: { type: GraphQLID },
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        displayName: { type: GraphQLString},


    }),

})

module.exports = { UserType }
