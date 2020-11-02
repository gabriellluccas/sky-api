const { mongoose } = require('../services');
const { auth } = require('../middleware');

const user = [
  {
    _method: 'get',
    _path: '/user/:id',
    _middleware: auth,
    _function: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await mongoose.findOne({ _id: id });
        return res.status(200).send({ data: result });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'internal error' });
      }
    },
  },
];

module.exports = { user };
