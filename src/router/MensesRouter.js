const express = require('express');
const xss = require('xss');
const { v4: uuidv4 } = require('uuid');
const mensesService = require('./mensesService');

const mensesRouter = express.Router();
const bodyParser = express.json();

const serializeItem = wiki_items =>({
  id:wiki_items.id,
  title:xss(wiki_items.wiki_title),
  content: xss(wiki_items.content),
    
});



mensesRouter
  .route('/articles')
  .get((req, res, next) =>{
    mensesService.getAllArticles(req.app.get('db'))
      .then(wiki_items =>{
        res.json(wiki_items.map(serializeItem));
      })
      .catch(next);
  });

module.exports = mensesRouter;