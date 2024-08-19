import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import { router as tasksRouter } from './routes/tasks.js';
import { connectToMongo } from './mongoConnection.js';

dotenv.config();
const app = express();

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
} catch (error) {
  console.error(error)
}