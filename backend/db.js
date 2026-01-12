const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Inotebook"; 

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

module.exports = connectToMongo;
