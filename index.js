const express= require('express')
const app= express();
const path= require('path');
const mongoose= require('mongoose');
const db= require('./connectDB');

app.set('view engine','ejs');
app.set('views','views');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//static middleware
app.use(express.static(path.join(__dirname,'public')))

//Route Handlers
const userRoutes= require('./routes/userRoutes');
const hotelRoutes= require('./routes/hotelRoutes');
// const adminRoutes= require('./routes/adminRoutes');

app.use('/user',userRoutes);
app.use('/',hotelRoutes);
// app.use('/admin',adminRoutes);

app.listen(4000,()=>{
    console.log("Listening on 4000")
})