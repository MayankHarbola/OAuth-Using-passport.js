const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./keys");
// const UserModel = require("../models/user-model"); 

passport.serializeUser((user,done)=>{  //serializeUser() is called when the user logs in; it decides what is stored in the cookie 
    
    done(null,user.id); // storing in cookie
});


passport.deserializeUser((id,done)=>{  //deserializeUser() is called on each request; it loads user data based on cookie's contents

// console.log(id);
if(id){
        done(null,id); // reterving cookie
    }
    
});

// passport.use(
    
//     new GoogleStrategy(
//         {  // first parameter 
//         // options for the google start 
//         callbackURL: "/" ,   // where after verifying google will redirect us -->same as value stored in (Authorized redirect URIs section)
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret
    
//         }, (accessToken,refreshToken,profile,done)=>{ // second parameter of google strategy
        
           
//         console.log("chl nhi rha ",profile);
        
        
//         })
// )

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:1234/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   
      return done(null, profile);
    
  }
));





// if(localStorage.data.googleId = profile.id)
// { 

//     // already have the user
//     // console.log("user is ", currentUser);
//     done(null,localStorage.data);//calling serializeUser function 

// }else
// {
//     //if not ,  create user in our db
//     if(localStorage)
//         {
//                 var datas = 
//                 {   
//                     username: profile.displayName,
//                     googleId: profile.id,
//                     thumbnail: profile._json.picture
//                 }
//                 localStorage.data = datas;

//                 done(null,localStorage.data);
//         }

// }