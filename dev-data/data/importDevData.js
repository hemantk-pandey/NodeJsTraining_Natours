const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('new connection ');
  });

// ADD ALL DATA TO DATABASE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Tours added');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL PREVIOUS DATA
const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted');
    process.exit();
  } catch (err) {
    console.log('Unable to delete');
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}
