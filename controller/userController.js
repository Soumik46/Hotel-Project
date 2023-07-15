const express= require('express');
const bcrypt= require('bcrypt');

const User= require('../models/user');


const renderSignUp= (req,res)=>{
    try{
        res.render('register')
    }
    catch(error){
        res.send(error.message)
    }
}



const hashPassword=async(password)=>{
    try{
        const passwordHash= await bcrypt.hash(password,10);
        return passwordHash;
    }catch(error){
        console.log(error.message);
    }
}

const saveSignUp=async(req,res)=>{
    try{const pass= await hashPassword(req.body.password);

    const newUser= new User({
        name: req.body.username,
        email: req.body.email,
        mobile: req.body.mno,
        password: pass,
        address: req.body.address,
        city: req.body.city,
        PIN: req.body.PIN
    })
    console.log(newUser);
    const userData= await newUser.save();
        if(userData){
            res.render('registration',{message:'Your registration has been successful...'})
        }else{
        res.render('registration',{message:'Your registration has failed...'})

        }}
        catch(error){
            console.log(error.message);
        }
}

module.exports={
    renderSignUp,
    saveSignUp
}