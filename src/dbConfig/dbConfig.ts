import mongoose, { mongo } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        // after connection is available we can listen variety of events
        connection.on('connected', () => {
        console.log("Connected to MongoDB")
        });

        connection.on('error', (err) => {
        console.log(`Connection error: ${err}`);
        process.exit();
        });
    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
        
    }
}