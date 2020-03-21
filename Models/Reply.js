const mongoose = require('mongoose');
const Thread = require('./Thread');

const replySchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
      required: 'A reply must be posted to a board',
    },
    thread: {
      type: mongoose.Schema.ObjectId,
      ref: 'Thread',
      required: 'A reply must be posted to a thread',
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

replySchema.pre('save', async function(next) {
  if (!this.isModified('thread')) {
    next();
  }
  await Thread.findByIdAndUpdate(
    this.Thread,
    { $addToSet: { replies: this._id } },
    { upsert: true }
  );
});

module.exports = mongoose.model('Reply', replySchema);
