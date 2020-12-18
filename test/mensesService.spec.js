const server = require('../src/server');
const supertest = require('supertest');
const app = require('../src/app');
const knex = require('knex');
const { expect } = require('chai');
const mensesService = require('../src/router/mensesService');


describe('server', () => {

  let db;

  let testArticles = [
    {

      wiki_title: 'First test post!',
      id: "544c68c9-b754-4e78-8262-f72913271dbd",
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      keywords: 'crimp, shrimp, dimp'
    },
    {

      wiki_title: 'Second test post!',
      id:"544c08c9-b754-4e78-8262-f72913271dbd",
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
      keywords: 'flink,blink,slink',
    },
    {

      wiki_title: 'Third test post!',
      id:"514c68c9-b754-4e78-8262-f72913271dbd",
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
      keywords: 'sleen, been, queen',
    },
  ];



  before( () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });

  });

  before( () => db('wiki_items').truncate(/*Remove all data from the table before running tests*/) );

  afterEach(() => db('wiki_items').truncate() ); 

  before(() => {
    return db
      .into('wiki_items')
      .insert(testArticles);
  });

  after('disconect db', () => db.destroy());

  describe('getAllArticles', () => {
    it(`resolves all articles from 'wiki_items' table`, () => {
      return mensesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql(testArticles);
        });
    });

  });
});