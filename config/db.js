import mongoose from 'mongoose'

export const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://hartikteetwal:258012@cluster0.5qv6e.mongodb.net/todo`).then(()=>console.log("Connect DB"))
}  