require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = admin => {
  return async (req, res, next) => {
    const token = req.headers.auth;
    if (!token) return res.send('access denied!');
    try {
      await jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) return res.status(403).send('Authorization Denied');
        else {
          if (admin && decoded.admin == true) {
            res.user = decoded.user;
            next();
          } else if (!admin) {
            res.user = decoded.user;
            next();
          } else {
            return res
              .status(403)
              .send('Authorization Denied, you are not admin');
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  };
};

module.exports = auth;
