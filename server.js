import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRouter from './router/userRouter.js'
import 'dotenv/config.js'
import taskRouter from './router/taskRouter.js'

const app = express()
const port  = 4000

connectDB()

app.use(express.json())
app.use(cors())


app.use("/api/user",userRouter)
app.use("/api/todo",taskRouter)


app.get("/",(req,res)=>{
    res.send("Hello word")
    
}) 



app.listen(port,()=>console.log(`Server Started on http://localhost:${port}`))