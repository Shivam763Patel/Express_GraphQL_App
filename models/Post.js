const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    authorId: 
    {
        type: String,
        required: true,

    },
    
    title:
    {
        type: String,
        required: true,
 
    },
 

    description: 
    {
        type: String,
        required: true,

    },

},

    {
        timestamps: true 
    }

)

module.exports = mongoose.model("GraphQLDEMOApp_Post",postSchema)

