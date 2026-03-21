const express = require("express");
const {connectMongoDb} = require('./connection.js')

const {logReqRes} = require("./middlewares/index.js")

const userRouter = require("./routes/user")

const app = express();
const port = 8000;


app.use(express.json());

// MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-2");

// Schema


// Model

// POST


// Middleware - Plugin
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));


//Routes
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});