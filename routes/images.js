const express = require('express');
const router = express.Router();
const fs = require('fs');

// Image Model
let Image = require('../models/image');
// User Model
// let User = require('../models/user');

// Home
router.get('/', function (req, res) {
  res.render('../views/index2',{title: "PhotoStream"});
});

// Add Route
router.get('/add', function(req, res){
  res.render('../views/add_image', {
    title:'Ajouter Image'
  });
});

// Add Submit POST Route
router.post('/add/loading', function(req, res){

    let image = new Image();
    image.title = req.body.title || "vide";
    image.body = req.body.body || "#";

    image.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/', {title: "PhotoStream"});
      }
    });
});

// Load Edit Form
router.get('/edit/:id', function (req, res) {
  Image.findById(req.params.id, function (err, image) {
    res.render('edit_image', {
      title: 'Edit Image',
      image: image
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function (req, res) {
  let image = {};
  image.title = req.body.title;
  image.body = req.body.body;

  let currentImage = { _id: req.params.id };

  Image.update(currentImage, image, function (err) {
    if (err) {
      console.log(err);

    } else {
      res.redirect('/', {title: "PhotoStream"});
    }
  });
});

// Delete the current image
router.delete('/:id', function (req, res) {

  let query = { _id: req.params.id };

  Image.findById(req.params.id, function (err, image) {

      Image.remove(query, function (err) {
        if (err) {
          console.log("l'image n'a pu être updatée en base de donnée dû à : " + err);
        }
        res.send('Image supprimée');
      });

  });
});

// Get Single Image
router.get('/:id', function(req, res){
  Image.findById(req.params.id, function(err, image){
      res.render('image', {
        image:image
      });
    });
});

module.exports = router;
