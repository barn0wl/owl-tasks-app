import { Router } from "express";
import { getAllTasks } from "../services/taskService.js";

export const router = Router()

router.get('/', async (req, res) => {
  try {
      const tasks = await getAllTasks()
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({error : 'internal server error'})
    }
  });