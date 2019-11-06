
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  staffToken,
  creditTransaction,
  wrongTransactionId,
  clientToken2,
  notFormattedTransactionId,
  dormantAccountNumber,
  emptyAmount,
  accountNumberTransaction,
  negativeInput,
  invalidCharacters,
  clientToken,
  nonExistingAccountNumber,
  debitTransaction,
  insufficientTransaction,
  transactionId,
  nonExistingTransactionId,
  activeAccountNumber
} from './helpers/fixtures';

const URL = '/api/v1';

describe('Transaction Route', () => {
  describe('Credit Transaction', () => {
    it('should let a cashier credit an active account', (done) => {
      request(app)
        .post(`${URL}/transactions/${activeAccountNumber}/credit`)
        .send(creditTransaction)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.nested.property('id');
          expect(res.body.data).to.have.nested.property('accountNumber');
          expect(res.body.data).to.have.nested.property('type');
          expect(res.body.data).to.have.nested.property('accountBalance');
          expect(res.body.data).to.have.nested.property('amount');
          expect(res.body).to.have.property('message').eql('1500 was credited to your account');
          if (err) return done(err);
          done();
        });
    });

    it('should  not let a cashier credit an account with an empty amount field', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/credit`)
        .send(emptyAmount)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Transaction amount cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not let a cashier credit an account with negative amount', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/credit`)
        .send(negativeInput)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Credit transaction amount cannot be less than 1 Naira');
          if (err) return done(err);
          done();
        });
    });


    it('should not let a cashier credit an account with an amount containing invalid characters', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/credit`)
        .send(invalidCharacters)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Transaction amount can only contain digits');
          if (err) return done(err);
          done();
        });
    });


    it('should not let a customer credit an account', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/credit`)
        .send(creditTransaction)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status').eql(401);
          expect(res.body).to.have.property('error').to.eql('You are not authorized to perform this action');
          if (err) return done(err);
          done();
        });
    });


    it('should not let a cashier credit a non existing account', (done) => {
      request(app)
        .post(`${URL}/transactions/${nonExistingAccountNumber}/credit`)
        .send(creditTransaction)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Account does not exist');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Debit Transaction Route', () => {
    it('should let a cashier debit an active account', (done) => {
      request(app)
        .post(`${URL}/transactions/${activeAccountNumber}/debit`)
        .send(debitTransaction)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.nested.property('id');
          expect(res.body.data).to.have.nested.property('accountNumber');
          expect(res.body.data).to.have.nested.property('type');
          expect(res.body.data).to.have.nested.property('accountBalance');
          expect(res.body.data).to.have.nested.property('amount');
          expect(res.body).to.have.property('message').eql('500 was debited from your account');
          if (err) return done(err);
          done();
        });
    });

    it('should not let a cashier debit an account with an empty amount field', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/debit`)
        .send(emptyAmount)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Transaction amount cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not let a cashier debit an account with negative amount', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/debit`)
        .send(negativeInput)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Debit transaction amount cannot be less than 1 Naira');
          if (err) return done(err);
          done();
        });
    });

    it('should not let a cashier debit an account with an amount containing invalid characters', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/debit`)
        .send(invalidCharacters)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Transaction amount can only contain digits');
          if (err) return done(err);
          done();
        });
    });

    it('should not let a customer debit an account', (done) => {
      request(app)
        .post(`${URL}/transactions/${accountNumberTransaction}/debit`)
        .send(debitTransaction)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(403)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('status').eql(403);
          expect(res.body).to.have.property('error').to.eql('You don\'t  have the permission to perform this action');
          if (err) return done(err);
          done();
        });
    });


    it('should not let a cashier debit a non existing account', (done) => {
      request(app)
        .post(`${URL}/transactions/${nonExistingAccountNumber}/debit`)
        .send(debitTransaction)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Account does not exist');
          if (err) return done(err);
          done();
        });
    });


    it('should not let a cashier debit an account with insufficient funds', (done) => {
      request(app)
        .post(`${URL}/transactions/${activeAccountNumber}/debit`)
        .send(insufficientTransaction)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Insufficient funds, cannot perform transaction');
          if (err) return done(err);
          done();
        });
    });


    it('should not let a cashier debit a dormant account', (done) => {
      request(app)
        .post(`${URL}/transactions/${dormantAccountNumber}/debit`)
        .send(debitTransaction)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('This account is not active please contact the admin');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get Transaction Route', () => {
    it('should get a transaction for a client', (done) => {
      request(app)
        .get(`${URL}/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${clientToken2}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.nested.property('id');
          expect(res.body.data).to.have.nested.property('accountNumber');
          expect(res.body.data).to.have.nested.property('type');
          if (err) return done(err);
          done();
        });
    });

    it('should get a transaction for a staff', (done) => {
      request(app)
        .get(`${URL}/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.nested.property('id');
          expect(res.body.data).to.have.nested.property('accountNumber');
          expect(res.body.data).to.have.nested.property('type');
          if (err) return done(err);
          done();
        });
    });

    it('should not view a transaction for another client', (done) => {
      request(app)
        .get(`${URL}/transactions/${wrongTransactionId}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Transaction can not be found');
          if (err) return done(err);
          done();
        });
    });

    it('should not get a transaction that does not exists', (done) => {
      request(app)
        .get(`${URL}/transactions/${nonExistingTransactionId}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').to.eql('Transaction can not be found');
          if (err) return done(err);
          done();
        });
    });

    it('should not get a wrongly formatted transaction id', (done) => {
      request(app)
        .get(`${URL}/transactions/${notFormattedTransactionId}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').to.eql('Transaction ID can only contain digits');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET All Transactions Route', () => {
    it('should get all transactions for authorized users', (done) => {
      request(app)
        .get(`${URL}/transactions`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('should get all transactions owned by an authorized user', (done) => {
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
});
