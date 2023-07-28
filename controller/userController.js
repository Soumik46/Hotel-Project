const express= require('express');
const bcrypt= require('bcrypt');

const User= require('../models/user');


const renderSignUp= (req,res)=>{
    try{
        res.render('screens/register')
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
        username: req.body.username,
        email: req.body.email,
        mobileNo: req.body.mno,
        password: pass,
        address: req.body.address,
        city: req.body.city,
        PIN: req.body.PIN
    })
    const userData= await newUser.save();
        if(userData){
            res.render('screens/login',{message:'Your registration has been successful...Login with the credentials'})
        }else{
        res.render('screens/register',{message:'Your registration has failed...'})
        }}
        catch(error){
            console.log(error.message);
        }
}

const loadLogin=async(req,res)=>{
    try{
        res.render('screens/login');
    }
    catch{
        console.log(error.message);
    }
}

const verifyLogin= async(req,res)=>{
    const email = req.body.email;
    const password= req.body.password;

    const userData= await User.findOne({email:email});
    
    if(userData){
        const passwordMatch= await bcrypt.compare(password,userData.password);
        if(passwordMatch){
            if(userData.is_verified === 0){
                res.render('login',{message:'Please verify your email'});
            }
            else{
                req.session.user_id=userData._id;
                res.redirect('/');
            }
        }
        else{
            res.render('screens/login', {message: 'Email or Password is incorrect'});
        }
    }
    else{
        res.render('screens/login', {message: 'Email or Password is incorrect'});
    }

}

module.exports={
    renderSignUp,
    saveSignUp,
    loadLogin,
    verifyLogin
}