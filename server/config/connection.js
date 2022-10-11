import mongoose from 'mongoose';
// const { connect, connection } = mongoose;

mongoose.connect(
    process.env.MONGOOSE_URI || 'mongodb://localhost:27017/view-from-here',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

export default mongoose.connection;