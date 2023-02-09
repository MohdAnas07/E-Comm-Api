const express = require('express');
const app = express();
const cors = require('cors');
const appData = require('./appData.json');

const port = process.env.PORT || 3000;

// Middleware passed 
app.use(cors());

// routes ======================
app.get("/", (req, res) => {
    res.send("I am Live...")
})

app.get('/service', (req, res) => {
    res.send(appData);
})



app.listen(port, () => {
    console.log(`server is running at PORT ${port}`)
})



