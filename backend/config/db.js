import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`)
        console.log(`Database connected : ${mongoose.connection.host}`)
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    process.exit(1);
    }
}

export default connectDB