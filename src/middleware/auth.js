const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ error: 'not authorized' });
    const [, token] = authorization.split(' ');
    const { data, exp } = await jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret',
    );
    if (Math.floor(Date.now() / 1000) > exp) return res.status(401).send({ error: 'invalid session' });
    if (data.id !== req.params.id) return res.status(401).send({ error: 'not authorized' });
    return next();
  } catch (err) {
    console.log(err.message);
    if (err.message === 'jwt malformed') return res.status(401).send({ error: 'not authorized' });
    return res.status(500).send({ error: 'internal error' });
  }
};

module.exports = auth;
