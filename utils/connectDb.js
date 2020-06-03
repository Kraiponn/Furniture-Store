import mongoose from "mongoose";
import colors from "colors";
const connection = {};

// rm -rf .git
async function connectDb() {
  if (connection.isConnected) {
    console.log("Mongodb existing already");
    return;
  }

  const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI_DEV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected ${conn.connection.host}`.cyan.bold);
  connection.isConnected = conn.connections[0].readyState;
}

export default connectDb;
