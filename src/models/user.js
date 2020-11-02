const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const PhoneSchema = new Schema({
  number: {
    type: String,
    required: true,
    description: 'Phone number',
  },
  ddd: {
    type: String,
    required: true,
    description: 'number location',
  },
}, { _id: false });

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    description: 'user name',
  },
  email: {
    type: String,
    required: true,
    description: 'user email',
    unique: true,
  },
  password: {
    type: String,
    required: true,
    description: 'user password',
  },
  phones: {
    type: [PhoneSchema],
    default: [],
    description: 'user phones',
  },
  token: {
    type: String,
    default: null,
    description: 'access token',
  },
  last_access: {
    type: Date,
    default: Date.now,
    description: 'last access',
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
}, { _id: false });

UserSchema.pre('save', function (next) {
  const user = this;
  const salt = bcrypt.genSaltSync();
  if (!user.isModified('password')) return next();
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.post('save', (user) => {
  // eslint-disable-next-line no-param-reassign
  user.token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 30),
    data: { id: user._id },
  }, process.env.JWT_SECRET || 'secret');
  if (!user.isModified('token')) return;
  user.save();
});

UserSchema.static('findOneByAuthorization', async function (auth) {
  const { email, password } = auth;
  const user = await this.findOne({ email });
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.password)) return null;
  user.last_access = Date.now();
  user.save();
  return user;
});

module.exports = mongoose.model('users', UserSchema);
