import express from "express";


const router = express.Router();

import Todos from "../DBoperations/Todos.js";



router.get('/read',Todos.get)

router.post('/create',Todos.add)

router.post('/update',Todos.update)

router.delete('/delete',Todos.delete)

export default router;