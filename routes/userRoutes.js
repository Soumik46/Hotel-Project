const userController= require('../controller/userController');
const express= require('express');
const router= express.Router();

const session = require('express-session')
const config= require('../config/config.js');
router.use(session({secret:config.sessionSecret}));

router.get('/register',userController.renderSignUp);
router.post('/register',userController.saveSignUp);
router.get('/login',userController.loadLogin);
router.post('/login',userController.verifyLogin);

module.exports=router;