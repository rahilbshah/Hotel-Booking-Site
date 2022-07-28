import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
    try {

        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
            img:req.body.img,
            city:req.body.city,
            isAdmin:req.body.isAdmin,
            country:req.body.country
        })

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
            const validity=await bcrypt.compare(req.body.password,user.password)
            if(!validity){
                res.status(400).json("Wrong Password")
            }else{
                const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
                const {password,isAdmin,...otherDetails}=user._doc;
                res.cookie("access_token",token,{
                    httpOnly:true,
                }).status(200).json({details:{...otherDetails},isAdmin})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}