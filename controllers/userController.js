import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET) 
}
const loginUser = async(req,res)=>{

    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})

        if(!user){  
            res.json({success:false,message:"User dosen't exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credential"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    try {
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hasedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export {loginUser,registerUser}