const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/User.routes");
const postRouter = require("./Routes/Post.routes");
const commentsRouter = require("./Routes/Comment.routes");
const likeRouter = require("./Routes/Like.routes");
const AuthRouter = require("./Routes/Auth.routes");
const connectDB = require("./Connection/connectDB");

const app = express();

const port = process.env["port"];

app.use(express.json());
app.use(cors());

app.use(AuthRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentsRouter);
app.use(likeRouter);

app.listen(port, async () => {
  try {
    await connectDB;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Database error: ", error);
  }
  console.log(`Server is running on Port ${port}`);
});
