const mongoose= require('mongoose')

const bookingSchema= mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },  
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Room'
    },
    from:{
        type:Date,
        required: true
    },
    to:{
        type: Date,
        required: true
    },
    amount:{
        type:Number,
        required: true
    }
});

const bookingModel= mongoose.model('Booking', bookingSchema);
module.exports= bookingModel;