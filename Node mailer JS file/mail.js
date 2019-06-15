const nodemailer = require("nodemailer");

function sendEmails(subject,message,recipients,response){
    nodemailer.createTestAccount((error,account)=>{
        let trans = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'fakenemo25@gmail.com',
                pass: 'yoyohoneysing'
            }
        });
        let mailOption = {
            from = 'mayankharbola25@gmail.com', // sender Address
            to: recipients,
            subject: subject,
            text: message
        };

        trans.sendMails(mailOption,(error,info)=>{
            if(error){
                response.send('cant send mail error',res);
            }else{
                res.send('accounts has been created');
            }
        })
    });

}

module.exports = sendEmails;