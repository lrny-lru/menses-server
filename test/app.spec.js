

const app = require('../src/app');
const knex = require('knex');
const { expect } = require('chai');

describe('App', () => {
  it('GET/ responds with 200 containing "hello, world"', () =>{
    return supertest(app)
      .get('/')
      .expect(200,'hello world');
  });
});