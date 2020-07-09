const express = require('express');
const router = express.Router();
const fs = require('fs');

// Image Model
let Image = require('../models/image');
// User Model
let User = require('../models/user');

// Home
router.get('/', function (req, res) {
  res.send({title: "PhotoStream"});
});

// Add Route
router.get('/add', function(req, res){
  res.render('../views/add_image', {
    title:'Add Image'
  });
});

// Add Submit POST Route
router.post('/add', function (req, res) {

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('add_image', {
      title: 'Add Image',
      errors: errors
    });
  } else {
    let reqImage = fs.readFileSync(req.body.body)
    let image = new Image();
    image.title = req.body.title;
    image.author = req.user._id;
    image.body = new Buffer(reqImage);

    image.save(function (err) {
      if (err) {
        console.log("l'image n'a pu être sauvegardée en base de donnée dû à : " + err);
        return;
      } else {
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', checkAuthor, function (req, res) {
  Image.findById(req.params.id, function (err, image) {
    if (image.author != req.user._id) {
      return res.redirect('/');
    }
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
  image.author = req.body.author;
  image.body = req.body.body;

  let currentImage = { _id: req.params.id }

  Image.update(currentImage, image, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Delete the current image
router.delete('/:id', function (req, res) {
  if (!req.user._id) {
    res.status(500).send();
  }

  let query = { _id: req.params.id }

  Image.findById(req.params.id, function (err, image) {
    if (image.author != req.user._id) {
      res.status(500).send();
    } else {
      Image.remove(query, function (err) {
        if (err) {
          console.log("l'image n'a pu être updatée en base de donnée dû à : " + err);
        }
        res.send('Image supprimée');
      });
    }
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
