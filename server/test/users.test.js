/* eslint-disable import/named */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  newStaff,
  adminToken,
  emptyStaffField,
  emptyStaffFirstName,
  emptyStaffLastName,
  nonAlphabetsStaffFirstName,
  nonAlphabetsStaffLastName,
  emptyStaffEmail,
  invalidStaffEmail,
  emptyStaffPassword,
  existingStaffEmail,
  invalidStaffPasswordLength,
  staffToken

} from './helpers/fixtures';

const URL = '/api/v1';
describe('Users Routes', () => {
  describe('Create user Route', () => {
    it('should create a new staff', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(newStaff)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(201);
          expect(res.body.data).to.have.property('id').eql(7);
          expect(res.body.data).to.have.property('firstName').eql('jack');
          expect(res.body.data).to.have.property('lastName').eql('daniel');
          expect(res.body.data).to.have.property('email').eql('dan@gmail.com');
          expect(res.body.data).to.have.property('role').eql('staff');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new staff with empty input fields', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(emptyStaffField)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('All fields are required');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new staff with an empty first name field', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(emptyStaffFirstName)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Firstname is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new staff with empty last name field', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(emptyStaffLastName)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Lastname is required');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a staff if the first name contains non-alphabets', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(nonAlphabetsStaffFirstName)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Firstname can only contain alphabets');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a staff if the last name contains non-alphabets', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(nonAlphabetsStaffLastName)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Lastname can only contain alphabets');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new staff with empty email field', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(emptyStaffEmail)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Email is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new staff with an invalid email', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(invalidStaffEmail)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Please provide a valid email');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new staff with empty password field', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(emptyStaffPassword)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(400);
          expect(res.body).to.have.property('error').equal('Password is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new staff with an invalid password length', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(invalidStaffPasswordLength)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').eql('Password must be at least 6 characters long');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a staff with an existing email address', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(existingStaffEmail)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(409)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error').equal('Staff already exists');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a staff without an admin token', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(newStaff)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(403)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').equal('You don\'t  have the permission to perform this action');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a staff with an empty token', (done) => {
      request(app)
        .post(`${URL}/users`)
        .send(newStaff)
        .set('Authorization', '')
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').equal('Please provide a token');
          if (err) return done(err);
          done();
        });
    });
  });
});
