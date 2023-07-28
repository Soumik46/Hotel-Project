const mongoose = require('mongoose');

var URL='mongodb://localhost:27017/Hotel-Room-DB';
mongoose.connect(URL)
.then(()=>{
    console.log("Connected to DB");
})
.catch(err=>{
    console.log(err);
}) 

module.exports= mongoose;