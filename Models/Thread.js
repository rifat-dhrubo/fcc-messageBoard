const mongoose = require('mongoose');
const Reply = require('./Reply');

const threadSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
      required: 'A thread must be posted to a board',
    },
    text: {
      type: String,
      required: 'A thread must have some texts',
    },
    reported: {
      type: Boolean,
      default: false,
      required: true,
    },
    delete_password: {
      type: String,
      required: 'A thread must have a delete password',
    },
    replies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Reply,
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_on', updatedAt: 'bumped_on' },
  }
);

module.exports = mongoose.model('Thread', threadSchema);
