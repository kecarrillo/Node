const express = require('express');
const router = express.Router();

// Image Model
let Image = require('../models/image');

// Add Route
router.get('/add', function(req, res){
  res.render('../views/add_image2', {
    title:'Add Image'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  console.log("Objet à enregistrer:");
  console.log(req.body.title);

    let image = new Image();
    image.title = req.body.title;
    image.body = req.body.body;

    image.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

// Load Edit Form
router.get('/edit/:id', function(req, res){
  Image.findById(req.params.id, function(err, file){

    res.render('edit_image', {
      title:'Modifier une photo',
      file:file
    });

  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let image = {};
  image.title = req.body.title;
  image.body = req.body.body;

  let query = {_id:req.params.id};

  Image.updateOne(query, image, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Delete Image
router.delete('/:id', function(req, res){

  let query = {_id:req.params.id};

  Image.findById(req.params.id, function(err, file){

    Image.remove(query, function(err){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    });

  });
});

// Get Single Image
router.get('/:id', function(req, res){
  Image.findById(req.params.id, function(err, file){
      res.render('image', {
        file:file
      });
    });
});

module.exports = router;
