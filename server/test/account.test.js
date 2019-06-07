import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  authUser,
  newAccount,
  emptyType,
  invalidNewAccount,
  newAccountTwo,
  staffToken,
  expiredToken,
  fakeToken
} from './helpers/fixtures';

const URL = '/api/v1';

let authToken;

describe('Account Routes', () => {
  before((done) => {
    request(app)
      .post(`${URL}/auth/signin`)
      .send(authUser)
      .end((err, res) => {
        const { token } = res.body.data;
        authToken = token;
        if (err) return done(err);
        done();
      });
  });

  it('should create an account for a new user', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(newAccount)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(201);
        expect(res.body.data).to.have.property('id').eql(3);
        expect(res.body.data).to.have.property('openingBalance').eql(0.00);
        expect(res.body).to.have.nested.property('data.accountNumber');
        expect(res.body).to.have.property('message').eql('Account created');
        if (err) return done(err);
        done();
      });
  });

  it('should not create an account when the type is an empty string', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(emptyType)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').to.eql('Account type is required');
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should not create an account when an invalid type is specified', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(invalidNewAccount)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').to.eql('Account type can only be either savings or current');
        expect(res.status).to.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it('should not create an account for a staff', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(newAccountTwo)
      .set('Authorization', `Bearer ${staffToken}`)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(401);
        expect(res.body).to.have.property('error').to.eql('Only clients can create accounts');
        expect(res.status).to.equal(401);
        if (err) return done(err);
        done();
      });
  });

  it('should not create an account with an empty token', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(newAccount)
      .set('Authorization', '')
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(401);
        expect(res.body).to.have.property('error').to.eql('Please provide a token');
        expect(res.status).to.equal(401);
        if (err) return done(err);
        done();
      });
  });

  it('should not create an account with an expired token', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(newAccount)
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(401);
        expect(res.body).to.have.property('error').to.eql('User authorization token is expired');
        expect(res.status).to.equal(401);
        if (err) return done(err);
        done();
      });
  });

  it('should not create an account with an invalid token', (done) => {
    request(app)
      .post(`${URL}/accounts`)
      .send(newAccount)
      .set('Authorization', `Bearer ${fakeToken}`)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(401);
        expect(res.body).to.have.property('error').to.eql('Invalid token');
        expect(res.status).to.equal(401);
        if (err) return done(err);
        done();
      });
  });
});
