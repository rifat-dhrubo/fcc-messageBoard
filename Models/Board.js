const mongoose = require('mongoose');
const Thread = require('./Thread');

const boardSchema = new mongoose.Schema({
  title: String,
  threads: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: Thread,
  },
});

module.exports = mongoose.model('Board', boardSchema);
