require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('../routes/users');
//const postRouter = require('./routes/posts');
const connection = mongoose.connection;
const app = express();

const uri = "mongodb+srv://" + process.env.ATLAS_USER + ":" + process.env.ATLAS_PASSWD + "@" + process.env.ATLAS_URI;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true });
connection.once('open', () => {
  console.log("Database connection established successfully!");
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on port ${port}`);

