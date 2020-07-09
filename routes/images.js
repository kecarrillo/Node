const express = require('express');
const router = express.Router();

// Image Model
let Image = require('../models/image');
// User Model
let User = require('../models/user');

// Add Route
router.get('/add', function(req, res){
  res.render('add_image', {
    title:'Add Image'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_image', {
      title:'Add Image',
      errors:errors
    });
  } else {
    let image = new Image();
    image.title = req.body.title;
    image.author = req.user._id;
    image.body = req.body.body;

    image.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Image Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', function(req, res){
  Image.findById(req.params.id, function(err, image){
    if(image.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      return res.redirect('/');
    }
    res.render('edit_image', {
      title:'Edit Image',
      image:image
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let image = {};
  image.title = req.body.title;
  image.author = req.body.author;
  image.body = req.body.body;

  let query = {_id:req.params.id}

  Image.update(query, image, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Image Updated');
      res.redirect('/');
    }
  });
});

// Delete Image
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Image.findById(req.params.id, function(err, image){
    if(image.author != req.user._id){
      res.status(500).send();
    } else {
      Image.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Image
router.get('/:id', function(req, res){
  Image.findById(req.params.id, function(err, image){
    User.findById(image.author, function(err, user){
      res.render('image', {
        image:image,
        author: user.name
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
