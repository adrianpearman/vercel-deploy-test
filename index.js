require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")
const PORT = process.env.PORT || 9000
// App Variables
const app = express()
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const spotifyApiObj = (refreshToken) => {
	return new SpotifyWebApi({
		redirectUri: `${process.env.REDIRECT_URI}/callback'`,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: refreshToken ? refreshToken : ""
	})
}

// GET Requests
// app.get('/', (req, res) => {
// 	res.send(process.env)
// })

app.get("/lyrics", async (req, res) => {
	const { artist, track } = req.query
	const lyrics = await lyricsFinder(artist, track) || "No Lyrics Found"
	res.json({ lyrics })
})

// POST Requests
app.post("/refresh", (req, res) => {
  const spotifyApi = spotifyApiObj(req.body.refreshToken)

  spotifyApi
	.refreshAccessToken()
	.then(data => {
		const {} = data.body
		res.json({
			accessToken: accessToken,
			expiresIn: expiresIn,
		})
	})
	.catch(err => {
		console.log(err.message)
		res.sendStatus(400)
	})
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = spotifyApiObj()

  spotifyApi
	.authorizationCodeGrant(code)
	.then(data => {
		const { access_token, refresh_token, expires_in } = data.body
		res.json({
			accessToken: access_token,
			refreshToken: refresh_token,
			expiresIn: expires_in,
		})
	})
	.catch(err => {
		console.log(err.message)
		res.sendStatus(400)
	})
})

app.listen(PORT, () => {
	console.log(`App is running on PORT:${PORT}`)
})