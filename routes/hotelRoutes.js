const express= require('express');
const router= express.Router();

const Hotel= require('../models/hotels');
const Rooms= require('../models/rooms');

const hotelController=require('../controller/hotelController');

router.get('/',hotelController.renderHome);
router.get('/view/:id',hotelController.showRooms);

router.get('/book/:id',hotelController.renderBookRoom);
router.post('/book/:id',hotelController.redirectToPay);

module.exports=router;
