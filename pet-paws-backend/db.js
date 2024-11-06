const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vvvaleksandrovvv:7I9OUD6YBY9DxLVZ@petpawsdb.2rgng.mongodb.net/?retryWrites=true&w=majority&appName=PetPawsDB'

const connectDB = async () => {
    console.log('..loading')
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.error('Error connecting in MongoDB', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;