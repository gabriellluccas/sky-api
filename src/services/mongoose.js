const { user } = require('../models');

const mongoose = {
  findOne: (query = {}) => user.findOne(query),
  deleteMany: (query = {}) => user.deleteMany(query),

  signUp: async ({
    name, email, password, phones = [],
  }) => {
    try {
      return user.create({
        name, email, password, phones,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  signIn: async ({ email, password }) => {
    try {
      return user.findOneByAuthorization({ email, password });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

module.exports = { mongoose };
