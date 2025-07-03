const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    } catch (err) {
        console.error("Error while connecting to Database.");
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDb;
