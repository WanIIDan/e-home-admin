const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/e-home', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connect success!')
});

module.exports = db