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
  res.status(200).render('../views/add_image2', {
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

  let d = new Date();
  d = new Date(d.getTime());
  let createdDate = (d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString()) +"-"+
      ((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString()) +"-"+
      d.getFullYear().toString() +" "+
      (d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString()) +":"+
      ((parseInt(d.getMinutes()/5)*5).toString().length==2?
          (parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";

  let image = new Image();
  image.title = req.body.title;
  image.body = req.body.body;
  image.created = createdDate;
  image.updated = createdDate;

  image.save(function(err){
    if(err){
        res.status(500).send('Erreur lors de la tentative d\'ajout de ' + req.body.title);
    } else {
        res.status(201).redirect('/');
    }
  });
});

/**
 * Affichage du formulaire de modification
 */
router.get('/edit/:id', function(req, res){
  Image.findById(req.params.id, function(err, file){

    res.status(200).render('edit_image', {
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

  let d = new Date();
  d = new Date(d.getTime());
  let updatedDate = (d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString()) +"-"+
      ((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString()) +"-"+
      d.getFullYear().toString() +" "+
      (d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString()) +":"+
      ((parseInt(d.getMinutes()/5)*5).toString().length==2?
          (parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";

  let image = {};
  image.title = req.body.title;
  image.body = req.body.body;
  image.updated = updatedDate;

  let query = {_id: req.params.id};

  Image.updateOne(query, image, function(err){
    if(err){
        res.status(500).send('Erreur lors de la tentative de mise à jour de ' + req.params.id);
    } else {
        res.status(201).redirect('/');
    }
  });
});

/**
 * Récupération et traitement de la requête HTTP
 * DELETE de demande de suppression
 */
router.delete('/:id', function(req, res){

  Image.findByIdAndDelete(req.params.id, function (err) {
    if(err) {
        res.status(500).send('Erreur lors de la tentative de suppression de ' + req.params.id);
    }
  });
  res.status(201).render('/', {title: "PhotoStream"});
});

/**
 * Affichage du détail
 */
router.get('/:id', function(req, res){
  Image.findById(req.params.id, function(err, file){
      res.status(200).render('image', {
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
