/* eslint-disable no-undef */
const knex = require('knex');
const app = require('../src/app');
const mensesService = require('../src/router/mensesService');
const mensesRouter = require('../src/router/MensesRouter');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Notes Endpoints', function () {
  let db;
  let newNote ={
    subject:'',
    content:'',
  };

  let testNote = [
    {
      'subject': 'o',
      'content': 'test'
    },
   
  ];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });
  before(() => db('notes').truncate());
  afterEach(() => db('notes').truncate());

  before(() => {
    return db
      .into('notes')
      .insert(testNote);
  });


  after('disconnect from db', () => db.destroy());

  describe('POST /notes', () => {
    ['subject', 'content'].forEach(field => {
      const newNote = { subject, content };

      it(`responds with 400 missing '${field}' if not supplied`, () => {
        delete newNote[field];

        return supertest(app)
          .post('/notes')
          .send(newNote)
          .expect(400, {
            error: { message: `'${field}' is required` },
          });
      });
    });

    it('with valid note, inserts into db and returns 201 with location', function () {
        this.retries(3);
        const { subject, content,  } = testNote;
        const newNote = { subject, content };
        const expected = serializeNote(newNote);

  });





});
 