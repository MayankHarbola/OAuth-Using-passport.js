const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');


// database work 
mongoose.connect('mongodb+srv://admin:admin@shopdb-ykzx1.mongodb.net/imageUpload?retryWrites=true');
mongoose.connection.on('open',()=>{
  console.log('connected to Database :-)');
})

var Schema = mongoose.Schema;
var Item = new Schema(
  { img: 
      { data: Buffer, contentType: String }
  }
);
var datamodel = mongoose.model('images',Item);





/*Here we are defining Multer storage settings. Multer supports two type of storage, viz. memory and disk. We are using diskStorage for this tutorial, as memory storage might give problems if the file is too large or multiple files are uploaded very fast.*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('Going to Store the Data in Disk');
      cb(null, './uploads')   // upload file Location
    },
    filename: function (req, file, cb) {
      console.log('File name is ',file.fieldname);
      cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
  })
  
  /*In the storage setting we give the destination path to save our files. We also rename our file. I’m appending datetime to the name in order to avoid any duplicate naming conflict. Also we need to append the file extension as by default Multer would save the file without any extension. */
  
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use( multer({ storage: storage }).single('file'));


app.post('/upload',(request, response)=>{
  console.log('Server Upload ......');
  
        response.json({'msg':'File Uploaded ....'});
        // datamodel.img.data = fs.readFileSync(__dirname + '/files/')
        // // newItem.img.contentType = ‘image/png’;
        // newItem.save();
})

app.listen(1234,()=>{
  console.log('Server Started...');
})