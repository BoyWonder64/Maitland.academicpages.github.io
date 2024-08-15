const express = require('express');
const myCustomRoute = require('./routes/user.js');
const myCustomRoute2 = require('./routes/foodFinder.js');

const app = express();
const port = 3000;

//Use the given routes 
app.use("/userFood", myCustomRoute);
app.use("/displayFood", myCustomRoute2);

app.use(express.static("public"));

app.listen(port, () => {
    console.log("Server started on port: " + port);
});