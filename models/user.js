const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, maxLength: 100, required: true },
  last_name: { type: String, maxLength: 100, required: true },
  email: { type: String, maxLength: 100, required: true },
  password: { type: String, maxLength: 100, required: true },
  membership_status: {
    type: String,
    required: true,
    enum: ['member', 'non-member'],
    default: 'non-member',
  },
  is_admin: { type: Boolean, default: false },
});

UserSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', UserSchema);
