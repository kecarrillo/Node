let mongoose = require('mongoose');
const { Binary } = require('mongodb');


let imageSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: Binary,
    required: true
  }
});

let Image = module.exports = mongoose.model('Image', imageSchema);
