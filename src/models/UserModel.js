const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  username: { type: String, unique: true },
  signupDate: { type: Date },
  posts: { type: Array },
});

const UserModel = mongoose.model('user', UserSchema);
// export default UserModel;
module.exports = {
  UserModel,
}
// import mongoose, { Schema } from 'mongoose';
//
// const UserSchema = new Schema({
//   username: { type: String, unique: true },
//   reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
// }, {
//   toJSON: {
//     virtuals: true,
//   },
// });
//
// const UserModel = mongoose.model('users', UserSchema);
// module.exports  = {
//   UserModel
// };