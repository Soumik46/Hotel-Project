const express= require('express')
const app= express();
const path= require('path');
const mongoose= require('mongoose');


app.set('view engine','ejs');
app.set('views','views/public');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const userController= require('./controller/userController');

mongoose.connect('mongodb://localhost:27017/Hotel-App')
.then(()=>{
    console.log("Connected to DB");
})
.catch(err=>{
    console.log(err);
})

app.get('/register',userController.renderSignUp);
app.post('/register',userController.saveSignUp);
app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(4000,()=>{
    console.log("Listening on 4000")
})