const mongoose = require('mongoose')
const open = () => {
    const {
        DB_PORT,
        DB_USER,
        DB_PASS,
        DB_NAME,
        DB_LINK_NAME,
    } = process.env;
    const dbUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_LINK_NAME}:${DB_PORT}/${DB_NAME}?authSource=admin` || 'mongodb://localhost:27017/sky';
    mongoose.set('useCreateIndex', true);
    return mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
}
const close = mongoose.disconnect
module.exports = { open, close }