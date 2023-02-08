const express = require("express")

const app = express()
const PORT = process.env.PORT || 9000
// Rendered build folder from client
const clientRoot = require("path").join(__dirname, "../client", "build")

app.get('/', (req, res) => {
    res.send("HELLO")
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static(clientRoot))
    app.get('/', (req, res) => {
        res.sendFile("index.html", {clientRoot})
    })
}

app.listen(PORT, () => {
    console.log(`App is running on PORT:${PORT}`)
})