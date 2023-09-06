const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://ankitverma242001:ankit2002@cluster1.lsbfmxa.mongodb.net/goodfood-mern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;

        // Now you can use global.food_items and global.foodCategory in your application

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongoDB;

