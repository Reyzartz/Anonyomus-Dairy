const {Router} = require('express')
const {postLogin,postSignup, getLogout} = require('../controlles/userController')

const userRouter  = new Router();

userRouter.post("/login",postLogin)

userRouter.post("/signup",postSignup)

userRouter.get("/logout",getLogout)

module.exports= userRouter