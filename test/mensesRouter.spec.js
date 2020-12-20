/* eslint-disable no-undef */
const knex = require('knex');
const app = require('../src/app');
const mensesService = require('../src/router/mensesService');
const mensesRouter = require('../src/router/MensesRouter');
const supertest = require('supertest');
const { expect } = require('chai');
const { createTestNotes } = require('./test-helpers');
const { onTag } = require('xss');
const { serializeNote } = require('../src/router/mensesService');

describe('Notes Endpoints', function () {
  let db;

  const testNotes = createTestNotes();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });
  before('ensure test db is emtpy', () => {
    return db.raw();
  });

  after('destroy db connection', () => {
    return db.destroy();
  });
  afterEach( 'clear db data',() =>{ 
    return db.raw();
  });
 




  describe('POST /notes', () => {
    ['subject', 'content'].forEach(field => {
      const newNote_id = '2385478dfhfhf-38ff';
      beforeEach('seed note', () =>{
        return db.into('notes').insert({ subject: 'foo', newNote_id });
      });
      it('inserts into db and returns 201', () =>{
        const { subject, content, id } = testNote[0];
        const newNote = { subject, content, id };
        const expected = serializeNote(newNote);

        return supertest( app )
          .post('/notes')
          .send( newNote )
          .expect(201)
          .expect( response =>{
            expect(response.body).to.include(expected);
          });
      });

      
    });


  });






});
