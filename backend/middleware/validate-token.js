const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const token = req.body.token;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded;
    next();
  });
}
module.exports = {
  validateToken,
};