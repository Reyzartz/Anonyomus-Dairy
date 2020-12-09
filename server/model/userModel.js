const bcrypt  = require('bcrypt')
const { Schema, model } = require("mongoose");

const userScehma = new Schema({
    email:{
        type:String,
        required:[true,'Please enter an Email'],
        unique:true,
        lowercase:true,
        validate:[(val)=>(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)),'Pleae enter a valid Email']
    },
    password:{
        type:String,
        required:[true,'Please enter an Password'],
        minlength:[6,"Password should have more than 6 characters"],
    }
})

userScehma.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userScehma.statics.login = async function(email,password){
    const user = await this.findOne({email})
    console.log(email,password);
    if(user){
        if(await bcrypt.compare(password,user.password)){
            console.log("logged in");
            return user
        }
        else{
            throw Error('user verification failed:Incorrect password')
        }
    }
    throw Error('user verification failed:This email is not Registered')
}

const User =new model('user',userScehma)

module.exports= User