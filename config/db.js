import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database ${con.connection.host}`);
    } catch (error) {
        console.log(`error in mongodb ${error}`);
    }
}

export default connectDb;