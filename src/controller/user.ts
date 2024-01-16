import {Request,Response} from "express"
import {UserModel} from "../models/user"
import { userSchema } from "../middleware/validate";

import { fromZodError } from 'zod-validation-error';
import { ZodError } from "zod";


const createUser=async(req:Request,res:Response)=>{
    try{
        const {name,email,gender}=req.body

        userSchema.parse(req.body)

        const user=new UserModel(req.body)

        await user.save()
        res.status(201).json({ msg: "User Saved" });
    }
    catch(err){
        if(err instanceof ZodError){
            const validationError = fromZodError(err);
            return res.status(500).json({ msg: validationError.toString() });
        }
        console.log(err);
        res.status(500).json({ msg: "Server Error" });
    }
        
}

const readUsers=async(req:Request,res:Response)=>{
    try{     
        const users= await UserModel.find()
        res.status(201).json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ msg: "Server Error" });
    }       
}

const readUserbyId=async(req:Request,res:Response)=>{
    try{   
        const {id}=req.params  
        const user= await UserModel.findById(id)
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ msg: "Server Error" });
    }       
}

const updateUser=async(req:Request,res:Response)=>{
    try{
        userSchema.parse(req.body)
        const {name,email,gender}=req.body
        const {id}=req.params  

        const user= await UserModel.findByIdAndUpdate(id,{name,email,gender})
        res.status(201).json({ msg: "User Updated" });
    }
    catch(err){
        if(err instanceof ZodError){
            const validationError = fromZodError(err);
            return res.status(500).json({ msg: validationError.toString() });
        }
        console.log(err);
        res.status(500).json({ msg: "Server Error" });
    }
        
}

const deleteUser=async(req:Request,res:Response)=>{
    try{   
        const {id}=req.params  
        const user= await UserModel.findByIdAndDelete(id)
        res.status(201).json({ msg: "User Deleted" });    }
    catch(err){
        console.log(err);
        res.status(500).json({ msg: "Server Error" });
    }       
}

export default {
    createUser,readUsers,readUserbyId,updateUser,deleteUser
}

