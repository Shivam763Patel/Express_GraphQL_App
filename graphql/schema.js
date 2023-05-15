//Improt required library from GraphQL
const { GraphQLObjectType, GraphQLSchema } = require("graphql")

//Improt queries
const { users , user} = require("./queries")

//Improt mutations
const { register, login , addPost} = require("./mutations")

//Define QueryType
const QueryType = new GraphQLObjectType({

    name: "QueryType",
    description: "Queries",
    fields:{
        users,
        user
    }
})

//Improt MutationType
const MutationType = new GraphQLObjectType({

    name: "MutationType",
    description: "Mutations",
    fields:{
        register, 
        login,
        addPost
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})


