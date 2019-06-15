const router = require('express').Router();
const passport = require('passport');
const url = require('url');  
// router.get('/login',(req,res)=>{
//     res.render("login",{user: req.user});
// })


// auth logout 

router.get('/logout',(req,res)=>{
    // handel with passport
    // res.send('logging out');
     req.logOut();
     
     res.redirect('/');
})


// auth with google

router.get('/google',passport.authenticate("google",{// 
    scope: ['profile','email']  // which info you need can add more 
}));

// callback route for google to redirect to 

router.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{ // here passport.authenticalte act differntly rather that redirecting it see the code that is present in the url as when we get verified and genrate data from it and send it to callback function in passport-setup.js file 
    

        console.log("data is received " , req.user);
 
    
        res.redirect(url.format({
            pathname:"/",
            query: {
               "name": req.user.displayName,
               "thumbnail": req.user._json.picture,
               
             }
          }));
})


module.exports = router;