const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true, --> not supported anymore
    // useCreateIndex: true, --> not supported anymore
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to db");
});

mongoose.connection.on("error", (error) => {
  console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
