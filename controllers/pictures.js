const imgModel = require("../models/picture");
const bodyParser = require("body-parser");
const path = require('path');

const fs = require('fs');
const multer = require('multer');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload = multer({ storage: storage });


const getImages = (req, res) => {
    imgModel.find({userId:req.session.userID}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('pictures', { items: items });
        }
    });
  }


const postImage = (req, res, next) => {
  let obj = {
      name: req.body.name,
      //desc: req.body.desc, taken out 
      userId:req.session.userID,
      img: {
          data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
          contentType: 'image/png'
          
      }
  }
  imgModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          res.redirect('/viewPictures');
      }
  });
}

const list = async(req,res)=>{

    try{
        const items = await imgModel.where('userId').equals((req.session.userID));

        res.render("viewPictures", {
            items: items
        });

    }catch(e){
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }
  }


module.exports = {
  getImages,
  postImage,
  list,
  upload
}


