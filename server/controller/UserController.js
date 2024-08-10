import User from "../models/User.js";
import bcrypt from "bcryptjs"

//Update the User
export const updateUser = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, 
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
        res.status(500).json(err);
  }
}

//Delete the User
export const deleteUser = async (req, res) => {
 
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
        res.status(500).json(err);
  }
}

//Get the User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
        res.status(500).json(err);
  }
}

//Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
        res.status(500).json(err);
  }
}
