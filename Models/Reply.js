const mongoose = require('mongoose');
const Board = require('./Board');
const Thread = require('./Thread');

const replySchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Board,
      required: 'A reply must be posted to a board',
    },
    thread: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Thread,
    },
    text: {
      type: String,
      required: 'A reply must have some texts',
    },
    reported: {
      type: Boolean,
      default: false,
    },
    delete_password: {
      type: String,
      required: 'A reply must have a delete password',
    },
  },
  {
    timestamps: { createdAt: 'created_on', updatedAt: 'bumped_on' },
  }
);

module.exports = mongoose.model('Reply', replySchema);
