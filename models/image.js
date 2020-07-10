let mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
  title:{
    type: String,

  },
  body:{
    type: String,
 
  }
});

let Image = module.exports = mongoose.model('Image', imageSchema);
