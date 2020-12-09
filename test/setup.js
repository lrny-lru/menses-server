const { expect } = require('chai');
const supertest = require('supertest');
const mocha = require('mocha');



global.expect = expect;
global.supertest = supertest;
global.mocha = mocha;