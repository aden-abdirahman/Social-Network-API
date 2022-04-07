const { connect, connection } = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/socialApiDB'

connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
