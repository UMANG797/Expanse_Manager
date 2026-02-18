const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    return proceed();

  } catch (err) {
    return res.redirect('/login');
  }

};
