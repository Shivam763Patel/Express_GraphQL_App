const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const {graphqlHTTP} =require("express-graphql")
const {createJwtToken} = require("./utils/auth")
const { authenticate} = require("./middleware/auth")
const app = express()
const schema = require("./graphql/schema")


// const port = process.env.PORT||3000;
// console.log(port)

dotenv.config()

//DB configration
const db = require("./config/key").MongoURI;

mongoose.set('strictQuery', true);
mongoose.connect(db).then(() => {
    console.log("Database connection is successfull") 

}).catch(() => {
    console.log(" Someting went wrong ")
})


app.get("/", (req,res)=> {

    res.json({
        
        message: "hello from app"
    })
})

// Demo example for jwt sign and genrate token
// app.get("/authtest", (req,res) => {

//     try{

//     res.json(createJwtToken({
//         username: "demo", 
//         password: "hsdb",
//         email:"demo@gmail.com",
//         displayName: "demo one",
    

//     })
    
//     )
// }
//     catch(error)
//     {
//         console.log("invalid",error)
//     }
    
// })

app.use("/graphql", graphqlHTTP({
    
    schema: schema,
    graphiql: true
    
}))



app.listen(process.env.PORT, () => {


    console.log('Server started at ${process.env.PORT}' )
})

