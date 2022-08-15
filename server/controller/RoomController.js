import Room from "../models/Room.js"
import Hotel from '../models/Hotel.js';

//Create the Room
export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update the Room
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }

}
//Update the Room Availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

//Delete the Room
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, { $pull: { rooms: req.params.id } });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json("Room Has been Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}

//Get the Room
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
}

//Get All Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
}