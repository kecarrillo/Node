let mongoose = require('mongoose');

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
    type: Buffer,
    required: true
  }
});

let Image = module.exports = mongoose.model('Image', imageSchema);
