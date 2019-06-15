const express = require('express')
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();


app.use(cookieSession({ // intialize a cookie for a day after searlizing 
    maxAge: 24*60*60*1000, // max time cookie will be saved (for a day)
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// set up routes 
app.use(express.static("public"));
app.use('/',authRoutes);





app.listen(process.env.PORT || 1234,(err)=>{
    if(err){
        console.log("err in server starting ", err);
    }else{
        console.log("server started............");
    }
})