import axios from "axios";
import { Task } from "../types/taskTypes";

const API_URL = 'http://localhost:3000'

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.log('error fetching tasks:', error)
        throw error
    }
}