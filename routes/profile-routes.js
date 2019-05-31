const router = require('express').Router();



const authCheck = (req,res,next)=>{//if user direclty hit an localhost:3000/profile without sign in then it should give error instead of that if we want to redirect them to new page which "please sign in"
   if(!req.user){
     // if user is not logged in
     res.redirect('/auth/login');
   }
   else{
       next();
   }
}

router.get('/',authCheck,(req,res)=>{
    // res.send('you are logged in,   this is your profile - ' + req.user.username);
    res.render('profile',{user: req.user});
})

module.exports  = router;