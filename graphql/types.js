const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql")
const { } = require("graphql")


const { User, Post, Comment} = require("../models/User")

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

const PostType = new GraphQLObjectType({
    name:"Post",
    description: "Post type",
    fields: () => ({

        id: { type: GraphQLID },
        title: { type: GraphQLString},
        description: { type: GraphQLString},

        author: {
            type: UserType,
            resolve(parent,args)
            {
                return User.findById(parent.authorId)
            },
        },

        Comment: {
            type: GraphQLList(CommentType),
            resolve(parent,args)
            {
                return Comment.find({postId: parent.id})

            },
        },
    }),
    
})

const CommentType = new GraphQLObjectType({

    name : "Comment",
    description: "Comment type",

    fields: ()=> ({

        id: { type: GraphQLID },
        comemnt: { type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args)
            {
                return User.findById(parent.userId)
            },
        },

        post: {
            type: PostType,
            resolve(parent,args)
            {
                return Post.findById(parent.postId)
            },
        },
    }),
})

module.exports = { UserType , PostType , CommentType}
