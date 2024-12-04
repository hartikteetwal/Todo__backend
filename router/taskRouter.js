import express from "express";
import { addName,getTasks,deleteTasks, addTask, showTasks, deleteItem} from "../controllers/taskController.js";
import authMiddleware from "../middleware/auth.js";

const taskRouter = express.Router()

taskRouter.post("/add_name",authMiddleware,addName)
taskRouter.post("/tasks",authMiddleware,getTasks)
taskRouter.post("/delete_name",authMiddleware,deleteTasks) 
taskRouter.post("/task_name",authMiddleware,addTask)
taskRouter.post("/show_task",authMiddleware,showTasks)
taskRouter.post("/delete_item",authMiddleware,deleteItem)
 
export default taskRouter  