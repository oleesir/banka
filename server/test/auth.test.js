import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

const URL = '/api/v1/auth';
describe('Auth Routes', () => {
  it('should signup a new user', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: 'gosling',
      email: 'ryan@gmail.com',
      password: 'ryangosl'
    };
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

  it('Should not register a new user with empty input fields', (done) => {
    const newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('All fields are required');
        if (err) return done(err);
        done();
      });
  });


  it('Should not register a new user with an empty first name field', (done) => {
    const newUser = {
      firstName: '',
      lastName: 'gosling',
      email: 'ryan@gmail.com',
      password: 'ryangosl'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('First name is required');
        if (err) return done(err);
        done();
      });
  });

  it('should not register a new user with empty last name field', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: '',
      email: 'ryan@gmail.com',
      password: 'ryangosl'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('Last name is required');
        if (err) return done(err);
        done();
      });
  });


  it('Should not register a user if the first name contains non-alphabets', (done) => {
    const newUser = {
      firstName: '/865',
      lastName: 'gosling',
      email: 'ryan@gmail.com',
      password: 'ryangosl'
    };

    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('First name can only contain alphabets');
        if (err) return done(err);
        done();
      });
  });

  it('Should not register a user if the last name contains non-alphabets', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: '76#@',
      email: 'ryan@gmail.com',
      password: 'ryangosl'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('Last name can only contain alphabets');
        if (err) return done(err);
        done();
      });
  });


  it('should not register a new user with empty email field', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: 'gosling',
      email: '',
      password: 'ryangosl'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('Email is required');
        if (err) return done(err);
        done();
      });
  });

  it('Should not register a new user with an invalid email', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: 'gosling',
      email: 'ryangmail.com',
      password: 'ryangosl'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('Please provide a valid email address');
        if (err) return done(err);
        done();
      });
  });


  it('should not register a new user with empty password field', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: 'gosling',
      email: 'ryan@gmail.com',
      password: ''
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('error').equal('Password is required');
        if (err) return done(err);
        done();
      });
  });

  it('Should not register a new user with an invalid password length', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: 'gosling',
      email: 'ryan@gmail.com',
      password: 'rya'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('Password must be at least 6 characters long');
        if (err) return done(err);
        done();
      });
  });

  it('Should not register a user with an existing email address', (done) => {
    const newUser = {
      firstName: 'ryan',
      lastName: 'gosling',
      email: 'ryan@gmail.com',
      password: 'ryangosl'
    };
    request(app)
      .post(`${URL}/signup`)
      .send(newUser)
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
