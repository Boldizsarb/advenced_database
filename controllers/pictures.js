const imgModel = require("../models/picture");
const bodyParser = require("body-parser");
const path = require('path');
const mime = require('mime-types'); // for checking the file is a pic nothing else

const fs = require('fs');
const multer = require('multer');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()) // to avoid name matching 
  }
});

let upload = multer({  // if the file is not a pic then an error will be thrown 
    storage: storage,
    fileFilter: function (req, file, cb) {
    // Allowing only PNG, JPG and JPEG
    if (mime.lookup(file.originalname) !== 'image/png' && mime.lookup(file.originalname) !== 'image/jpeg') {
        return cb(new Error('Only image files are allowed!'), false)
        
    }
    cb(null, true);
}
});


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

  const remove = async(req,res)=>{
    const id = req.params.id;
    try{
        await imgModel.findByIdAndRemove(id);
        res.redirect("/viewPictures");




    }catch (e) {
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }}


module.exports = {
  getImages,
  postImage,
  list,
  remove,
  upload
}


