let mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
  title:{
    type: String,
  },
  body:{
    type: String,
  },
  created:{
    type: String,
  },
  updated:{
    type: String,
  }
});

let Image = module.exports = mongoose.model('Image', imageSchema);
