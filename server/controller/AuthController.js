import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password,salt);
    try {
        const newUser=new User({...req.body,password:hash})
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
}
export const login=async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        if(!user) res.status(404).json("User Does not Exist")
        else{
            const validity=await bcrypt.compareSync(req.body.password,user.password)
            if(!validity){
               return res.status(400).json("Wrong Password")
            }else{
                const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{expiresIn:"5d"})
                const {password,...otherDetails}=user._doc;
                res.cookie("access_token",token,{
                    httpOnly:true,
                }).status(200).json({details:{...otherDetails}})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}