/**
 * Appel des routes et de l'application
 * @type {createApplication}
 */
const express = require('express');
const router = express.Router();

/**
 * Appel du Model Image
 */
let Image = require('../models/image');

/**
 * Affichage du formulaire d'ajout
 */
router.get('/add', function(req, res){
  res.render('../views/add_image2', {
    title:'Ajouter une photo'
  });
});

/**
 * Récupération et traitement de la requête HTTP
 * POST du formulaire d'ajout
 */
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

/**
 * Affichage du formulaire de modification
 */
router.get('/edit/:id', function(req, res){
  Image.findById(req.params.id, function(err, file){

    res.render('edit_image', {
      title:'Modifier une photo',
      file:file
    });

  });
});

/**
 * Récupération et traitement de la requête HTTP
 * POST du formulaire de modification
 */
router.post('/edit/:id', function(req, res){
  let image = {};
  image.title = req.body.title;
  image.body = req.body.body;

  let query = {_id: req.params.id};

  Image.updateOne(query, image, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

/**
 * Récupération et traitement de la requête HTTP
 * DELETE de demande de suppression
 */
router.delete('/:id', function(req, res){

  Image.findByIdAndDelete(req.params.id, function (err) {
    if(err) res.status(500).send('Erreur lors de la tentative de suppression de ' + req.params.id);
  });
  res.status(200).send('Suppression effectuée avec succès.');
});

/**
 * Affichage du détail
 */
router.get('/:id', function(req, res){
  Image.findById(req.params.id, function(err, file){
      res.render('image', {
        title:'Détails de la photo',
        file:file
      });
    });
});

/**
 * Rend le traitement des requêtes HTTP accessible
 * @type {Router}
 */
module.exports = router;
