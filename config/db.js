const mongoose = require('mongoose');
require('dotenv').config();

const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.info(`database connected`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = DB;
