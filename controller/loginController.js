const {User} = require("../model/schoolDB")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// register logic
exports.registerAdmin = async(req,res)=>{
    const{name,email,password,secretKey} = req.body
    // verify admin secret key
    if (secretKey !== process.env.secretKey){
        return res.status(403).json({message:"Unauthorized account creation"})
    }
    // check if the user exists
    const userExist = await User.findOne({email})
    if (userExist){
        res.json({message:"Email has already been taken"})
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const user = new User({
        name,
        email,
        password:hashedPassword,
        role:"admin",
        isActive:true,
        teacher:null,
        parent:null
    })
    const newUser = await user.save()

    res.status(201).json({message:"Admin account created",newUser})
}

// login user
exports.login = async(req,res)=>{
    const {email,password}= req.body
    // console.log(email,password)
    // check the user by the email
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"Invalid credentials"})
    }
    // Check if the user is active
    if(!user.isActive){
        return res.status(403).json({message:"Your account has been deactivated"})
    }
    // Check the password
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid Credentials"})
    }
    // generate the jwt Token
    const token = jwt.sign(
        {userId:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )

    res.json({message:"login successful",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }})
}