const { mongoose } = require('../services');

const auth = [
  {
    _method: 'post',
    _path: '/sign-up',
    _function: async (req, res) => {
      try {
        const {
          name, email, password, phones,
        } = req.body;
        const error = [];
        if (!name) error.push('name is required');
        if (!password) error.push('password is required');
        if (!email) error.push('email is required');
        else if (await mongoose.findOne({ email })) error.push(`${email} already exist`);
        if (error.length) return res.status(400).send({ message: error });
        const result = await mongoose.signUp({
          name, email, password, phones,
        });
        return res.status(200).send({ data: result });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'internal error' });
      }
    },
  }, {
    _method: 'post',
    _path: '/sign-in',
    _function: async (req, res) => {
      try {
        const { email, password } = req.body;
        const error = [];
        if (!password) error.push('password is required');
        if (!email) error.push('email is required');
        else if (!(await mongoose.findOne({ email }))) error.push(`${email} don't exist`);
        if (error.length) return res.status(400).send({ message: error });
        const result = await mongoose.signIn({ email, password });
        if (!result) return res.status(400).send({ message: 'Invalid email/password' });
        return res.status(200).send({ data: result });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'internal error' });
      }
    },
  },
];

module.exports = { auth };
