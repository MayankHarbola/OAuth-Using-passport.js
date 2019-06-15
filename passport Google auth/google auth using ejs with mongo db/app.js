const express = require('express');
const authRoutes = require('./routes/auth-routes');
const ProfileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/key');
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express();
//set up view engine
app.set('view engine','ejs');

app.use(cookieSession({ // intialize a cookie for a day after searlizing 
    maxAge: 24*60*60*1000, // max time cookie will be saved (for a day)
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



// set up routes 
app.use('/auth',authRoutes);
app.use('/profile',ProfileRoutes);

//connect to mongodb

mongoose.connect(keys.mongodb.mongodbURI,()=>{
    console.log("connected to mongodb");
})

//create home route 
app.get('/',(req,res)=>{
    res.render('home',{user : req.user});
})




app.listen(process.env.PORT || 3000,()=>{
    console.log("server started......")
})
