import Hotel from '../models/Hotel.js';
import Room from "../models/Room.js"

//Create the Hotel
export const createHotel = async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Update the Hotel
export const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Delete the Hotel
export const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Has been Deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

//Get the Hotel
export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Get All Hotels
export const getAllHotels = async (req, res) => {
    const {min,max,...others}=req.query;
    try {
        const hotels = await Hotel.find({...others,cheapestPrice:{$gt:min || 1,$lt:max || 10000}}).limit(req.query.limit)
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Count By City
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Count By Type
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "Apartments" });
        const resortCount = await Hotel.countDocuments({ type: "Resorts" });
        const villaCount = await Hotel.countDocuments({ type: "Villas" });
        const cabinCount = await Hotel.countDocuments({ type: "Cabins" });
        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "Apartments", count: apartmentCount },
            { type: "Resorts", count: resortCount },
            { type: "Villas", count: villaCount },
            { type: "Cabins", count: cabinCount },
        ]);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Room by Id
export const getHotelRooms=async (req,res,next)=>{
    try {
        const hotel=await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}