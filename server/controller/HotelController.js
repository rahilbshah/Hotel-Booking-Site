import Hotel from '../models/Hotel.js';

//Create the Hotel
export const createHotel=async (req,res)=>{
    const newHotel=new Hotel(req.body)
    try {
        const savedHotel=await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Update the Hotel
export const updateHotel=async (req,res)=>{
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Delete the Hotel
export const deleteHotel=async (req,res)=>{
    try {
        const deletedHotel=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Has been Deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

//Get the Hotel
export const getHotel=async (req,res)=>{
    try {
        const hotel=await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Get All Hotels
export const getAllHotels=async (req,res)=>{
    try {
        const hotels=await Hotel.find()
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
}