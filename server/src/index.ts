import express from 'express';
import bodyParser from 'body-parser';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import cors from 'cors'
import { router as tasksRouter } from './routes/tasks.js';
import { connectToMongo } from './mongoConnection.js';
import { getAllNotionTasks } from './services/notionService.js';
import { Task } from './models/task.js';
import { parseNotionPageToTask } from './services/taskService.js';
import { IPageObject } from './models/notion/notionTypes.js';
import { TaskDocument } from './models/mongo/taskSchema.js';
import { addTaskToMongo, convertTaskToMongo } from './services/mongoService.js';

dotenv.config();
const app = express();
export const notion = new Client ({auth: process.env.NOTION_KEY});
export const databaseId = process.env.NOTION_DATABASE_ID?? "";

//middleware

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes

app.use('/', tasksRouter)

//start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

try {
  connectToMongo()
  .then( () => {return getAllNotionTasks()})
  .then( res => {
    const allTasks : Task[] = []
    res.forEach(task => {
      const newTask = parseNotionPageToTask(task as IPageObject)
      allTasks.push(newTask)
    })
    const taskDocuments : TaskDocument[] = []
    allTasks.forEach(task => {
      const newTaskDocument = convertTaskToMongo(task)
      taskDocuments.push(newTaskDocument)
    })
    taskDocuments.forEach(task => {
      addTaskToMongo(task)
    })
  })
  .catch( error => { console.log(error)})
} catch (error) {
  console.error(error)
}