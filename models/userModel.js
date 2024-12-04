import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true}, 
    password:{type:String,required:true},
    tasks:{type:Object,default:[]},
    date:{type:Number}
})     

const userModel = mongoose.model.users || mongoose.model("user",userSchema)

export default userModel  