const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 300 },
  timestamp: { type: Date, default: Date.now() },
});

messageSchema.virtual('timestamp_formatted').get(function () {
  return `${this.timestamp.toUTCString()}`;
});

messageSchema.virtual('url').get(function () {
  return `/message/${this._id}`;
});

module.exports = mongoose.model('Message', messageSchema);
