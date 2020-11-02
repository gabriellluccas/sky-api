const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router');

dotenv.config();
const server = express();

server.use(express.json());
server.use(router);

const {
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_LINK_NAME,
} = process.env;
const dbUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_LINK_NAME}:${DB_PORT}/${DB_NAME}?authSource=admin` || 'mongodb://localhost:27017/sky';
mongoose.set('useCreateIndex', true);
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = server;
