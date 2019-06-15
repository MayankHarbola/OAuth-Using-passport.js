just add `mail('---Subject of email----', "---msg to user----",Email Address ,res);` wherever in a code
 you want to send a mail for example you want to send mail after the user get registered just do something like this

```
here the  userObject contain the user name and user email addredd

 UserModel.create(userObject,(err)=>{
           if(err){
            response.status(500).json({status:'S',message:'Record Not Added Due to Error'+ err});
           }else{
               
                // jst add these line first when is where is the file you have stored 
                // second one is jst simply passing argument in mail 
                const mail = require('../../utils/mail');
		mail('Your account has been created...',`congratulaion ${userObject.userid} your account has been created `,userObject.emailId,response)
        
	        response.status(200).json({status:'S',message:'Record Added'});
           }
    });
```

