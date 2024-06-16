const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, // This is deprecated, but keeping it for compatibility
            useUnifiedTopology: true // This is deprecated, but keeping it for compatibility
        });
        console.log("Database Successfully Connected");
    } catch (error) {
        console.error("Database Connection Error:", error);
    }
};

module.exports = dbConnect;
