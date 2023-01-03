const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    // get token from request headers
    const token = req.headers.authorization.split(' ')[1];
    
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach the userId to the req.body
    req.body.userId = decoded.userId;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
