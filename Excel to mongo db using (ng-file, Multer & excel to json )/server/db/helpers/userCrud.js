const userModel = require('../models/userSchema');

const userOperation = {

    add(userArray)
    {
       
            for(let userObject of userArray )
            {
                if(userObject.username != "")
                {
                    userModel.create(userObject,(err)=>
                    {
                        if(err)
                        {
                            console.log(typeof(userObject.username));
                            console.log({status:'S',message:'Record Not Added Due to Error'+ err});
                        }else{
                            console.log(userObject.username);

                            // const mail = require('../../utils/mail');
                        //  mail('Your account has been created...',`congratulaion ${userObject.userid} your account has been created `,userObject.emailId,response)
                        console.log({status:'S',message:'Record Added'});
                        }
                    });
                        
                }else {
                        break;
                    }
            }
    }
}

module.exports = userOperation;