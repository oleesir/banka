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
    const token = BearerToken.split(' ')[1];
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized you must be logged in'
      });
    }

    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid token'
        });
      }
      req.decoded = decoded;
      return next();
    });
  }
}
