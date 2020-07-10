let mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});

let Image = module.exports = mongoose.model('Image', imageSchema);
