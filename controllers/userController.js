const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc      register new user
//@routes    POST /api/users
//@access    public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    //check if the user exist
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }
    
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name, email, password: hashedPwd
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }

})

//@desc      auth a user
//@routes    POST /api/users/login
//@access    public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //check user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc      get users data
//@routes    GET /api/users
//@access    private
const getUser = asyncHandler(async(req, res) => {
    res.json({message: "user data"})
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
}