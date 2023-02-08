const express = require("express")

const app = express()
const PORT = process.env.PORT || 9000

app.get('/', (req, res) => {
    res.send("HELLO")
})

app.listen(PORT, () => {
    console.log(`App is running on PORT:${PORT}`)
})