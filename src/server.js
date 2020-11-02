const express = require('express');
const dotenv = require('dotenv');
const { mongoose } = require('./config');
const router = require('./router');

const serverFunction = async (isTest = false) => {
  dotenv.config();
  const server = express();

  server.use(express.json());
  server.use(router);
  if (!isTest) await mongoose.open();
  return server;
};

module.exports = serverFunction;
