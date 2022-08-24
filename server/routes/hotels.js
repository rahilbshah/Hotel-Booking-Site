import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, searchByCity, searchByType, updateHotel } from '../controller/HotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router=express.Router();

//CREATE
router.post("/",verifyAdmin,createHotel);

//UPDATE
router.put("/:id",verifyAdmin,updateHotel);

//DELETE
router.delete("/:id",verifyAdmin,deleteHotel);

//GET
router.get("/find/:id",getHotel);

//GET ALL
router.get("/",getAllHotels);

//GET COUNT BY CITY
router.get("/countbyCity",countByCity);

//GET COUNT BY TYPE
router.get("/countbyType",countByType);

//GET SEARCH BY TYPE
router.get("/searchbyType",searchByType);

//GET SEARCH BY CITY
router.get("/searchbyCity",searchByCity);

//GET ROOM BY ID
router.get("/room/:id",getHotelRooms);


export default router;