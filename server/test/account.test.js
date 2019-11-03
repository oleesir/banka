import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  clientToken,
  clientTokenTwo,
  newAccount,
  emptyType,
  invalidNewAccount,
  newAccountTwo,
  staffToken,
  expiredToken,
  fakeToken,
  adminToken,
  doesNotContainDigits,
  invalidAccountNumber,
  dormantAccountNumber,
  emptyAccountNumber,
  nonExistingAccountNumber,
  lessThanTenDigits,
  wrongAccountNumber,
  deleteAccountNumber,
  userAccountNumber,
  editStatus,
  emptyStatus,
  invalidStatus,
  dormantAccount
} from './helpers/fixtures';

const URL = '/api/v1';

describe('Account Routes', () => {
  describe('Create Account', () => {
    it('should create an account for a client', (done) => {
      request(app)
        .post(`${URL}/accounts`)
        .send(newAccount)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(201);
          expect(res.body.data).to.have.property('id').eql(6);
          expect(res.body.data).to.have.property('balance').eql(0.0);
          expect(res.body.data).to.have.property('status').eql('dormant');
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
        .set('Authorization', `Bearer ${clientTokenTwo}`)
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
        .set('Authorization', `Bearer ${clientToken}`)
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
          expect(res.body).to.have.property('error').to.eql('You are not authorized to perform this action');
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


  describe('Get Account', () => {
    let clientAccountNumber;

    before((done) => {
      request(app)
        .post(`${URL}/accounts`)
        .send(newAccount)
        .set('Authorization', `Bearer ${clientToken}`)
        .end((err, res) => {
          const { accountNumber } = res.body.data;
          clientAccountNumber = accountNumber;
          if (err) return done(err);
          done();
        });
    });


    it('should get an account for client', (done) => {
      request(app)
        .get(`${URL}/accounts/${clientAccountNumber}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body.data).to.have.property('accountNumber').eql(clientAccountNumber);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });


    it('should not get an account that does not belong to client', (done) => {
      request(app)
        .get(`${URL}/accounts/${wrongAccountNumber}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Account does not exists');
          if (err) return done(err);
          done();
        });
    });

    it('should get any account for staff', (done) => {
      request(app)
        .get(`${URL}/accounts/${clientAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body.data).to.have.property('accountNumber').eql(clientAccountNumber);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('should not get an account with an account number more than 10 digits', (done) => {
      request(app)
        .get(`${URL}/accounts/${invalidAccountNumber}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account number must be 10 digits');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });

    it('should not get an account with account number less than 10 digits', (done) => {
      request(app)
        .get(`${URL}/accounts/${lessThanTenDigits}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account number must be 10 digits');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });

    it('should not get an account if account number is not an integer', (done) => {
      request(app)
        .get(`${URL}/accounts/${doesNotContainDigits}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account number can only contain digits');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });


    it('should not get a non-existing account', (done) => {
      request(app)
        .get(`${URL}/accounts/${nonExistingAccountNumber}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Account does not exists');
          expect(res.status).to.equal(404);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get all Accounts', () => {
    it('should get all accounts for authorized users', (done) => {
      request(app)
        .get(`${URL}/accounts`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('should get all accounts owned by an authorized user', (done) => {
      request(app)
        .get(`${URL}/accounts`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Edit Account', () => {
    let clientAccountNumber;

    before((done) => {
      request(app)
        .post(`${URL}/accounts`)
        .send(newAccount)
        .set('Authorization', `Bearer ${clientToken}`)
        .end((err, res) => {
          const { accountNumber } = res.body.data;
          clientAccountNumber = accountNumber;
          if (err) return done(err);
          done();
        });
    });

    it('should allow a staff to edit an account status', (done) => {
      request(app)
        .patch(`${URL}/accounts/${clientAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(editStatus)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body.data).to.have.property('accountNumber').eql(clientAccountNumber);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('should not edit an account status by a non-staff', (done) => {
      request(app)
        .patch(`${URL}/accounts/${userAccountNumber}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(editStatus)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(401);
          expect(res.body).to.have.property('error').to.eql('You are not authorized to perform this action');
          expect(res.status).to.equal(401);
          if (err) return done(err);
          done();
        });
    });


    it('should not edit an account status if the account number is more than 10 digits', (done) => {
      request(app)
        .patch(`${URL}/accounts/${invalidAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(editStatus)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account number must be 10 digits');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });


    it('should not edit an account status if a status is not provided', (done) => {
      request(app)
        .patch(`${URL}/accounts/${userAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(emptyStatus)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Status can only be active or dormant');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });


    it('should not edit an account status if an invalid status is provided', (done) => {
      request(app)
        .patch(`${URL}/accounts/${userAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(invalidStatus)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Status can only be active or dormant');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });


    it('should not deactivate an account that already deactived', (done) => {
      request(app)
        .patch(`${URL}/accounts/${dormantAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(dormantAccount)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account is already dormant');
          if (err) return done(err);
          done();
        });
    });


    it('should return an error for an invalid account number', (done) => {
      request(app)
        .patch(`${URL}/accounts/${doesNotContainDigits}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(editStatus)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account number can only contain digits');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });


    it('should return an error message when an account that does not exist is requested', (done) => {
      request(app)
        .patch(`${URL}/accounts/${nonExistingAccountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(editStatus)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Account does not exist');
          expect(res.status).to.equal(404);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete Account', () => {
    let clientAccountNumber;

    before((done) => {
      request(app)
        .post(`${URL}/accounts`)
        .send(newAccount)
        .set('Authorization', `Bearer ${clientToken}`)
        .end((err, res) => {
          const { accountNumber } = res.body.data;
          clientAccountNumber = accountNumber;
          if (err) return done(err);
          done();
        });
    });
    it('should allow an admin to delete an account', (done) => {
      request(app)
        .delete(`${URL}/accounts/${clientAccountNumber}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body).to.have.property('message').to.eql('Account deleted successfully');
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('Should not allow a client delete an account', (done) => {
      request(app)
        .delete(`${URL}/accounts/${deleteAccountNumber}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(401);
          expect(res.body).to.have.property('error').to.eql('You are not authorized to perform this action');
          expect(res.status).to.equal(401);
          if (err) return done(err);
          done();
        });
    });


    it('should not delete a non-existing account', (done) => {
      request(app)
        .delete(`${URL}/accounts/${nonExistingAccountNumber}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Account does not exist');
          expect(res.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });
  });
});
