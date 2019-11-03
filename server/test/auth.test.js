/* eslint-disable import/named */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  newUser, emptyUser, emptyFirstName,
  emptyLastName, nonAlphabetsFirstName, nonAlphabetsLastName,
  emptyEmail, invalidEmail, emptyPassword, invalidPasswordLength,
  existingEmail, authUser, emptyAuthUser, emptyEmailAuthUser, emptyPasswordAuthUser,
  wrongUserAuth, wrongUserAuthEmail, wrongEmailAuthUser

} from './helpers/fixtures';

const URL = '/api/v1/auth';
describe('Auth Routes', () => {
  describe('Signup Route', () => {
    it('should signup a new user', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with empty input fields', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('All fields are required');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with an empty first name field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('First name is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with empty last name field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyLastName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Last name is required');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a user if the first name contains non-alphabets', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetsFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('First name can only contain alphabets');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a user if the last name contains non-alphabets', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetsLastName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Last name can only contain alphabets');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with empty email field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Email is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an invalid email', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(invalidEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Please provide a valid email address');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with empty password field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Password is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an invalid password length', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(invalidPasswordLength)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').eql('Password must be at least 6 characters long');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a user with an existing email address', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(existingEmail)
        .expect(409)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('status').equal(409);
          expect(res.body).to.have.property('error').equal('User already exists');
          if (err) return done(err);
          done();
        });
    });
  });


  describe('Signin Route', () => {
    it('should log in an existing user ', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(authUser)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('message').equal('Login successful');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with empty email and password fields', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(emptyAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Email and password are required');
          if (err) return done(err);
          done();
        });
    });


    it('should not log in a user with empty email field', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(emptyEmailAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Email is required');
          if (err) return done(err);
          done();
        });
    });


    it('should not log in a user with empty password field', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(emptyPasswordAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Password is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with wrong details', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(wrongUserAuth)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status').equal(401);
          expect(res.body).to.have.property('error').equal('Email or password is incorrect');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with wrong details', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(wrongUserAuthEmail)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status').equal(401);
          expect(res.body).to.have.property('error').equal('Email or password is incorrect');
          if (err) return done(err);
          done();
        });
    });


    it('should not log in a new user with an invalid email', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(wrongEmailAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Please provide a valid email address');
          if (err) return done(err);
          done();
        });
    });
  });
});
