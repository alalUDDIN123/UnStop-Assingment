const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
const ConnectDb = require("./config/Db.connect")
const cors = require("cors");
const seatsRouter = require("./routes/seats.routes");


app.use(cors())
app.use(express.json())

// home route

app.get("/", (req, res) => {
    res.send("Welcome to backend home route")
})

// All Routes

app.use('/api/seats',seatsRouter)


const PORT = process.env.PORT || 8085;
app.listen(PORT, async () => {
    await ConnectDb()
    console.log(`Server running on http://localhost:${PORT}`)
})