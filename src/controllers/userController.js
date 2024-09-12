const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const SECRET_KEY = process.env.SECRET_KEY;
const signup = async (req,res)=>{

    //Existing User Check
    //Hashed Password
    //user Creation 
    //Token Generate

    const {username, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email : email})

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        const token = jwt.sign({email: result.email, Id: result._Id}, SECRET_KEY);
        res.status(201).json({user: result, token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}
const signin = async(req,res)=>{
    
    const {email, password} = req.body;

    try {

        const existingUser = await userModel.findOne({email : email});

        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email: existingUser.email, Id: existingUser._Id}, SECRET_KEY);
        res.status(200).json({user: existingUser, token: token});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = {signup, signin}