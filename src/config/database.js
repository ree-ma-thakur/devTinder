const mongoose = require("mongoose");

const connectDB = async () => {
  // connect fun returns a promise & tell whether connection was succesfully done or not; therefore will use async await
  await mongoose.connect(
    // "mongodb+srv://reemathakur2114:pduReZQjvozRRmAG@namastenode.kbbwx.mongodb.net/" // It refers to whole cluster
    "mongodb+srv://reemathakur2114:pduReZQjvozRRmAG@namastenode.kbbwx.mongodb.net/devTinder" //It will create & refer to devTinder DB
  );
};

module.exports = connectDB;
