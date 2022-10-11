import mongoose from 'mongoose';
const { connect, connection } = mongoose;

connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/view-from-here',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

export default connection;