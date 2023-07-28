const mongoose= require('mongoose');

const imageSchema = new mongoose.Schema({
    data: String, // Store image data as base64 string
  });

const imageModel= mongoose.model('Image', imageSchema);
module.exports= imageModel;