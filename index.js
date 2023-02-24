const path = require('path')
const express = require("express")
require('dotenv').config()
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000

// Page Home
app.get("/", (req, res) => {
    res.send('SERVER ON')
})

// ZingMp3Router
const chatBotRouter = require("./src/routes/ChatbotRouter")
app.use("/", cors({ origin: '*' }), chatBotRouter)

// Page Error
app.get("*", (req, res) => {
    res.send("The URL WAS NOT FOUND")
});

app.listen(port, () => {
    console.log(`Start server listen at http://localhost:${port}`)
});
