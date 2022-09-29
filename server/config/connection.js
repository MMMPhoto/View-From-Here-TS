import mongoose from 'mongoose';
const { connect, connection } = mongoose;

connect(
    process.env.MONGOOSE_URI || 'mongodb://127.0.0.1:27017/view-from-here',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

export default connection;