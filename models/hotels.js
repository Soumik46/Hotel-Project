const mongoose= require('mongoose');
const hotelSchema= mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required:true
    },

    email:{
        type: String,
        required: true
    },

    description:{
        type:String,
        required:true
    },
    roomTypes:[{
        type: String,
        required: true
    }],
    facilities:[{
        type:String, required:true
    }]

});

const hotelModel= mongoose.model('Hotel',hotelSchema);
module.exports= hotelModel;