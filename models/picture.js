const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new mongoose.Schema({
    name: String,
   
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('imagges', imageSchema);

// desc: String,