import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controller/UserController.js';
import {  verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router=express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("Hello User, You are logged in")
// })


//UPDATE
router.put("/:id",updateUser,verifyUser);

//DELETE
router.delete("/:id",deleteUser,verifyUser);

//GET
router.get("/:id",getUser,verifyUser);

//GET ALL
router.get("/",getUsers,verifyAdmin);


export default router;