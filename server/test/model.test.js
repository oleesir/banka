import '@babel/polyfill';
import { expect } from 'chai';
import Model from '../src/db/index';

const users = new Model('users');
const accounts = new Model('accounts');


describe('Model: test wrong input', () => {
  describe('create', () => {
    it('should not create a new user with wrong values', (done) => {
      users.create(
        ['first_name', 'last_name', 'email', 'password', 'role'],
        ['\'Amaka\',\'Emodi\',\'qwertyuiopdj\',\'client\'']
      ).then((result) => {
        expect(result === undefined).to.equal(true);
        done();
      }).catch(err => done(err));
    });
  });

  describe('select', () => {
    it('should not select from table with wrong constraint', (done) => {
      users.select(['*'],
        ['email=\'amaka@gmail.com'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });

  describe('update', () => {
    it('should not update from table with wrong constraint', (done) => {
      accounts.update(['status=\'active'], ['id=2'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });

  describe('delete', () => {
    it('should not delete from table with wrong constraint', (done) => {
      accounts.delete(['id=1"'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });

  describe('selectAll', () => {
    it('should not select all from table with wrong attributes', (done) => {
      accounts.selectAll(['"*'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });
});
