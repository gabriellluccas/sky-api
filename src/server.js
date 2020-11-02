const express = require('express');
const dotenv = require('dotenv');
const { mongoose } = require('./config');
const router = require('./router');

const server = async () => {

  dotenv.config();
  const server = express();
  
  server.use(express.json());
  server.use(router);
  await mongoose();
  return server
}
  
module.exports = server();
