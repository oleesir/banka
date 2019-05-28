import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('app', () => {
  it('should display bank app', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Banka app');
        if (err) return done(err);
        done();
      });
  });
});
