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
  keywords:xss(wiki_items.keywords)
    
});


mensesRouter
  .route('/topics')
  .get((req, res, next) =>{
    mensesService.getAllArticles(req.app.get('db'))
      .then((wiki_items) =>{
        res.json(wiki_items.map(serializeItem));
      })
      .catch(next);
  });

  
/*mensesRouter
  .route('/topics/firsttopic)
  .get((req, res, ))

*/

mensesRouter
  .route('/topics/:searchTerm')
  .get((req, res, next) =>{
    const { searchTerm } = req.params;
    mensesService.getRelatedArticles(req.app.get('db'), searchTerm)
      .then(wiki_items =>{
        res.json(wiki_items.map(serializeItem));
      })
      .catch(next);
  });

mensesRouter
  .post('/notes',bodyParser, (req, res, next) => {
    for ( const field of ['subject', 'content'] ) {

      console.log('body: ' + JSON.stringify(req.body));
      if ( !req.body[field] ) {

        return res.status(400).send(`'${field}' is required`);
      }
    }

    const { subject, content } = req.body;
    const newNote = { subject, content };
    console.log(req.body);
    mensesService.insertNote(req.app.get('db'), newNote)
      .then( note => {
        res
          .status( 201 )
        
          .json( mensesService.serializeNote(note) );
      })
      .catch( next );

  });

module.exports = mensesRouter;