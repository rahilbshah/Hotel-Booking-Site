import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from '../controller/HotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router=express.Router();

//CREATE
router.post("/",createHotel,verifyAdmin);

//UPDATE
router.put("/:id",updateHotel,verifyAdmin);

//DELETE
router.delete("/:id",deleteHotel,verifyAdmin);

//GET
router.get("/find/:id",getHotel);

//GET ALL
router.get("/",getAllHotels);

//GET COUNT BY CITY
router.get("/countbyCity",countByCity);

//GET COUNT BY TYPE
router.get("/countbyType",countByType);

//GET ROOM BY ID
router.get("/room/:id",getHotelRooms);

export default router;