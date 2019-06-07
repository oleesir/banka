import jwt from 'jsonwebtoken';

/**
 * @class Authorization
 */
export default class Authorization {
  /**
   * @method checkToken
   *
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   *
   * @returns {object} status and message
   */
  static checkToken(req, res, next) {
    const BearerToken = req.headers['x-access-token'] || req.headers.authorization;
    const token = BearerToken && BearerToken.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Please provide a token'
      });
    }

    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ status: 401, error: 'User authorization token is expired' });
        }
        return res.status(401).json({ status: 401, error: 'Invalid token' });
      }

      req.decoded = decoded;
      return next();
    });
  }
}