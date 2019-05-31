const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./key");
const UserModel = require("../models/user-model"); 

passport.serializeUser((user,done)=>{  //serializeUser() is called when the user logs in; it decides what is stored in the cookie 
    
    done(null,user.id); // storing in cookie
});


passport.deserializeUser((id,done)=>{  //deserializeUser() is called on each request; it loads user data based on cookie's contents
    UserModel.findById(id).then((user)=>{
        done(null,user); // reterving cookie
    });
    
});

passport.use(
    
    new GoogleStrategy(
        {  // first parameter 
        // options for the google start 
        callbackURL: "/auth/google/redirect" ,   // where after verifying google will redirect us -->same as value stored in (Authorized redirect URIs section)
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        }, (accessToken,refreshToken,profile,done)=>{ // second parameter of google strategy

        // passport callback function 
        // console.log("passport callback function fired ");
        // console.log(profile);

        UserModel.findOne({googleId: profile.id}).then((currentUser)=>{
            console.log(profile);
             console.log(profile._json.picture);

            if(currentUser){
                // already have the user
                console.log("user is ", currentUser);
                done(null,currentUser);//calling serializeUser function 
            }else{
                //if not ,  create user in our db

                new UserModel({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser)=>{
                    console.log('new user created: ' + newUser);
                   
                    done(null,newUser);
                });
            }
        });

        
    })
)