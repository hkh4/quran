require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(express.static('client/build'))

// This will be used when deploying to heroku
app.get("*", (req,res) => {
	res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

app.listen(process?.env.PORT || 5000, () => {
	console.log("Running on port 5000");
})
