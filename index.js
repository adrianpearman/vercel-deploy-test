const express = require("express")

const app = express()
const path = require("path")
const PORT = process.env.PORT || 9000
// Rendered build folder from client
const clientRoot = path.join(__dirname, "../client", "build")

app.get('/', (req, res) => {
    res.send("Hello")
    // app.use(express.static(clientRoot))
    // res.sendFile(clientRoot, "index.html")
})

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(clientRoot))
//     app.get('/', (req, res) => {
//         // res.sendFile("index.html", {clientRoot})
//         res.send({ hello: "jhgsvkhg"})
//     })
// }

app.listen(PORT, () => {
    console.log(`App is running on PORT:${PORT}`)
})