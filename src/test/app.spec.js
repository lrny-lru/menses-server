

const app = require('../src/app');
const supertest = require('supertest');

describe('App', () => {
  it('GET/ responds with 200 containing "hello, world"', () =>{
    return supertest(app)
      .get('/')
      .expect(200,'hello world');
  });
});