import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controller/RoomController.js';
import {verifyAdmin} from '../utils/verifyToken.js'
const router=express.Router();

//CREATE
router.post("/:hotelId",createRoom,verifyAdmin);

//UPDATE
router.put("/:id",updateRoom,verifyAdmin);

//UPDATE availability
router.put("/availability/:id",updateRoomAvailability);

//DELETE
router.delete("/:id/:hotelId",deleteRoom,verifyAdmin);

//GET
router.get("/:id",getRoom);

//GET ALL
router.get("/",getAllRooms);

export default router;