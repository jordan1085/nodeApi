const mongoose = require('mongoose');
require('dotenv').config({path: 'environment.env'});

const dbConnection = async () => {
  // Configuracion con mongodb cloud
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Data base connected')
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  dbConnection
}