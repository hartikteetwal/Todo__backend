import userModel from "../models/userModel.js";


const addName = async(req,res) =>{
    try {
        let userTasks = await userModel.findById(req.body.userId)
        let tasks = await userTasks.tasks

        const nam = req.body.name
        const task = {name:nam,data:[],date:Date.now()}

        tasks.push(task)
        
        await userModel.findByIdAndUpdate(req.body.userId,{tasks})
        return res.json({success:true,message:`Task "${req.body.name}" Added`,tasks})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const getTasks = async(req,res) =>{
    try {
        const userTasks = await userModel.findById(req.body.userId)
        const tasks = await userTasks.tasks
        return res.json({success:true,tasks})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const showTasks = async(req,res) =>{
    try {
        const userTasks = await userModel.findById(req.body.userId)
        const ind = req.body.index 
        const data = await userTasks.tasks[ind].data
        return res.json({success:true,data})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const deleteTasks = async(req,res) =>{
    try {
        const userTasks = await userModel.findById(req.body.userId)
        const tasks = await userTasks.tasks
        const {ind} = req.body
        const task = tasks.filter((item,index)=>{return index!==ind})
        
        await userModel.findByIdAndUpdate(req.body.userId,{tasks:task})
        res.json({success:true,task}) 
    } catch (error) {
        console.log(error); 
        res.json({success:false,message:"Error"})
    }
}

const addTask = async(req,res)=>{
    try {
        let userTasks = await userModel.findById(req.body.userId)
        let tasks = await userTasks.tasks
        const item = req.body.item
        const ind = req.body.index
        tasks[ind].data.push(item)
        await userModel.findByIdAndUpdate(req.body.userId,{tasks})
        return res.json({success:true,message:`Task "${req.body.item}" Added`,data:tasks[ind].data})
    } catch (error) { 
        console.log(error);
        res.json({success:false,message:"Error"})
    }
} 

const deleteItem = async(req,res)=>{
    try {
        let userTasks = await userModel.findById(req.body.userId)
        let task = await userTasks.tasks
        
        const itemId = req.body.iId
        const todoId = req.body.tId
        const tasks = task.map((item,index)=>{
            if(index==todoId){
                item.data = [...item.data.filter((val,ind)=>{return ind!=itemId})]
            }
            return item
        })
        await userModel.findByIdAndUpdate(req.body.userId,{tasks})
        res.json({success:true,data:tasks[todoId].data})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
 
export {addName,getTasks,deleteTasks,addTask,showTasks,deleteItem} 