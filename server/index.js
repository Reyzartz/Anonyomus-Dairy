require('dotenv').config()
const express  =  require('express')
const app = express();
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const pageRouter = require('./routes/pageRouter')
const cors  = require('cors')

mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
    .then(()=>{
        console.log("Connected to Database");        
        app.listen(5000,()=>{
            console.log("Connected the server");
});
    })
    .catch((err)=>{
        console.log(err);
    })


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

//Routes
app.use(userRouter);
app.use(pageRouter);
