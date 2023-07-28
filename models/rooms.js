const mongoose= require('mongoose');

const roomSchema= new mongoose.Schema({
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hotel'
    },
    countRooms:{
        type:Number,
        required: true
    },
    maxCount:{
        type:Number,
        required: true
    },
    rent:{
        type: Number,
        required:true
    },

    roomType:{
        type:String,
        required:true
    },
    images:[],
    currentBookings:[]
})

const roomModel= mongoose.model('Room', roomSchema);
module.exports= roomModel;