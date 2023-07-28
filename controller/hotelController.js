const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const Hotel= require('../models/hotels');
const Rooms= require('../models/rooms');
const Bookings= require('../models/bookings');
const User= require('../models/user');

const renderHome= async (req,res)=>{
    try{
        // console.log(req.session.user_id);
        // if(req.session.user_id===undefined)
        // {
        //     const user=null;
        // }
        // else{
        //     const user=  await User.findById(req.session.user_id);
        // }
        const hotels= await Hotel.find({});
        res.render('screens/home',{hotels });
        // res.send(hotels._id);
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const showRooms=async(req,res)=>{
    try{      
        const rooms= await Rooms.find({hotel:req.params.id}).populate('hotel').populate('images');
        // res.send(rooms[0].images[0].data);
        res.render('screens/viewRooms',{rooms});
        // res.render('screens/viewfiles',{rooms});

    }catch(err){
        console.log(err);
    }
}
const renderBookRoom=async(req,res)=>{
    try{      
        const room= await Rooms.findById(req.params.id)
        res.render('screens/bookRoom',{room});
    }catch(err){
        console.log(err);
    }
}
const redirectToPay= async(req,res)=>{
    const room= await Rooms.findById(req.params.id).populate('hotel');

    const date_from = new Date(req.body.date_from);
    const date_to = new Date(req.body.date_to);
    let date_arr= new Array();
    date_arr=getDates(date_from,date_to);
    const obj={
        from: date_from.toDateString(),
        to: date_to.toDateString(),
        amount: date_arr.length* room.rent
    }
    if(!hasCommon(date_arr,room.currentBookings))
    {
    res.render('screens/redirectToPay', {room,obj});
    }
    else{
        res.render('screens/bookRoom',{room,msg:'No rooms available for selected dates'});
    }
}

const bookRoom= async(req,res)=>{
    // console.log(req.params.id);
    const room= await Rooms.findById(req.params.id);

    const date_from = new Date(req.body.date_from);
    const date_to = new Date(req.body.date_to);
    let date_arr= new Array();
    date_arr=getDates(date_from,date_to);
    let msg='';
    if(!hasCommon(date_arr,room.currentBookings))
    {
        try{
            room.currentBookings.concat(date_arr);
            const booking= new Booking({
                room: room,
                from: date_from,
                to: date_to,
                amount: date_arr.length * room.rent
            })
            booking.save();
            room.save();
        }catch(err)
        {
            console.log(err.message);
        }
        res.render('/screens/bookRoom',{room, msg:'Booking Successfull'});
    }
    else
    res.render('/screens/bookRoom',{room, msg:'Room is already booked for given date'});
    console.log(date_arr);
    res.send(msg);
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function hasCommon(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
}

module.exports={
    renderHome,
    showRooms,
    renderBookRoom,
    redirectToPay,
    bookRoom
}