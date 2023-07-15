const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    mobileNo:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    PIN:{
        type:String,
        required: true
    }
})

module.exports= mongoose.model('User',userSchema);