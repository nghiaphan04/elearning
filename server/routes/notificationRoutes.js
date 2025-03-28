import express from "express";
import { createNew,getAll } from "../controllers/notificationController.js";

const notificationRouter = express.Router()

notificationRouter.post('/createNewNotification', createNew)
notificationRouter.get('/getAll', getAll)

export default notificationRouter
