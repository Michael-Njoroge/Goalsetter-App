const jwt = require('jsonwebtoken')
const asycHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

//@desc    Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asycHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
 })

//@desc    Authenticate new user
//@route    POST /api/users/login
//@access   Public
const loginUser = asycHandler(async(req, res) => {
    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
 })

//@desc    Get user data
//@route    GET /api/users/me
//@access   Private
const getMe = asycHandler(async(req, res) => {
    res.json({message: 'Display User data'})
})

module.exports = {
    registerUser,loginUser,getMe
}
