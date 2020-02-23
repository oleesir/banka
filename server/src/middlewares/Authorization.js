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

    if (!token) return res.status(401).json({ status: 401, error: 'Please provide a token' });

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

  /**
   * @method authorizeRole
   *
   * @param {array} roles
   *
   * @returns {function} middleware to authorize role
   */
  static authorizeRole(roles) {
    return async (req, res, next) => {
      const { role: userRole } = req.decoded;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ status: 403, error: 'You don\'t  have the permission to perform this action' });
      }
      next();
    };
  }
}
