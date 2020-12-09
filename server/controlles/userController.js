require('dotenv').config()
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const maxCookieAge = 24 * 60 * 60

const createToken = (id) =>{
    return jwt.sign({id},
            process.env.JWT_SERECT,
            {expiresIn:maxCookieAge});
}

const handleError=(err)=>{
    console.log(err);
    const errors = {
        email:"",
        password:""
    }
    if(err.code===11000){
        errors.email="Email already registerd"
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    if(err.message.includes('user verification failed')){
        if(err.message.includes('email')){
            errors.email = "This email is not registered"
        }
        if(err.message.includes('password')){
            errors.password = "Incorrect password"
        }
    }
    return errors
}


module.exports.postSignup=async (req,res)=>{
    const {email,password} = req.body
    console.log(req.body);
    try{
        const user = await User.create({...req.body});
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxCookieAge * 1000 });
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = handleError(err)
        res.status(400).json({errors})   
    }
}

module.exports.postLogin = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user =await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxCookieAge * 1000 });
        res.status(200).json({user:user._id})
    }
    catch(err){
        const errors = handleError(err)
        res.status(400).json({errors}) 
    }
}

module.exports.getLogout = (req,res)=>{
    console.log("logout");
    res.cookie('jwt', "", { maxAge:1 });
    res.status(200).json("ok")
}
