const mongoose = require('mongoose');
const { UserModel }= require('./UserModel.js');
require('dotenv').config();
const serverAddress = `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const testUserParams = {
  username: 'gonzo',
  signupDate: new Date(0),
  posts: ['post1', 'post2'],
}

const updatedTestUserParams = {
  username: 'zaphod',
  signupDate: new Date(),
  posts: ['post3', 'post4'],
}

beforeAll(async () => {
  await mongoose.connect(serverAddress);
  await mongoose.connection.db.dropCollection('users');
})

afterAll(async () => {
  await mongoose.disconnect();
})

it('create("unknown username")', async () => {
  expect.assertions(1);
  const response = await UserModel.create(testUserParams);
  const user = response._doc;
  expect(user).toStrictEqual({
    ...testUserParams,
    _id: user._id,
    __v: user.__v,
  });
});

it('create("known username") should throw "E11000 duplicate key error collection: ...', async () => {
  expect.assertions(1);
  try {
    await UserModel.create(testUserParams);
  } catch (error) {
    expect(error.code).toStrictEqual(11000);
  }
});

it('findOne("known username")', async () => {
  expect.assertions(1);
  const response = await UserModel.findOne({ username: testUserParams.username });
  const user = response._doc;
  expect(user).toStrictEqual({
    ...testUserParams,
    _id: user._id,
    __v: user.__v,
  });
});

it('findOne("unknown username") should return null.', async () => {
  expect.assertions(1);
  const response = await UserModel.findOne({ username: "unknownUser_" });
  expect(response).toBeNull();
});


it('findOneAndUpdate("known username")', async () => {
  expect.assertions(1);
  const response = await UserModel.findOneAndUpdate(
    { username: testUserParams.username },
    {...updatedTestUserParams},
    { returnOriginal: false });

  const updatedUser = response._doc;
  expect(updatedUser).toStrictEqual({
    ...updatedTestUserParams,
    _id: updatedUser._id,
    __v: updatedUser.__v,
  });
});

it('findOneAndDelete("known updated username")', async () => {
  expect.assertions(1);
  const response = await UserModel.deleteOne({ username: updatedTestUserParams.username });
  const deletedCount = response.deletedCount;
  expect(deletedCount).toStrictEqual(1);
});