import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controller/UserController.js';
import {  verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router=express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("Hello User, You are logged in")
// })


//UPDATE
router.put("/:id",verifyUser,updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUser);

//GET ALL
router.get("/",verifyAdmin,getUsers);


export default router;