const Page = require("../model/pageModel")
const jwt = require('jsonwebtoken')

const getUser = (token)=>{
    let id = null;
    jwt.verify(token,'dudududududududududududududududu',(err,decodedToken)=>{
        if(err){
            console.log(err.message);
        }
        else{
            id =decodedToken.id
        }
    })
    return id;
}

module.exports.getPage= async (req,res)=>{
    try{
        const pages = await Page.find();
        res.json({...pages})
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
}
module.exports.getMyPage = async (req,res)=>{
    const id = getUser(req.cookies.jwt);
    try{
        const pages = await Page.find({authorId:id})
        res.json({...pages})
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
}
module.exports.postPage=async (req,res)=>{
    const id = getUser(req.cookies.jwt);
    try{
        const page = await Page.create({...req.body,authorId:id});
        res.json({pageid:page._id})
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
    
}

module.exports.deletePage=async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    try{
        const page = await Page.deleteOne({_id:id})
        res.send("deleted")
    }
    catch(err){
        console.log(err);
    }
}

module.exports.putPage=async (req,res)=>{
    const id = req.params.id 
    const snippet = req.body.snippet
    try{
        await Page.updateOne({_id : id},{$set:{snippet}})
        res.send("update Page")
    }
    catch(err){
        console.log(err);
    }
    
}