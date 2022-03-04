/*
const express = require('express');
const { port } = require('./config.json');

const app = express();

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
*/

const { port } = require("./config.json");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(
  session({
    secret: "Keep it secret",
    name: "uniqueSessionID",
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) res.redirect("../index.html");
  else res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/play", (req, res) => {
  if (req.session.loggedIn) {
	  res.sendFile("../kk_index.html", { root: path.join(__dirname, "public") });
  } else res.redirect("/");
});



app.post(
  "/authenticate",
  bodyParser.urlencoded(),
  (req) => {
    // Actual implementation would check values in a database

  		const fragment = new URLSearchParams(window.location.hash.slice(1));
		const [accessToken, tokenType, state] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('state')];
   
		if (!accessToken) {
		  const randomString = generateRandomString();
			  localStorage.setItem('oauth-state', randomString);
  
			  document.getElementById('login').href += `&state=${btoa(randomString)}`;
		  return document.getElementById('login').style.display = 'block';
		}
  
		if (localStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
			return console.log('You may have been clickjacked!');
		}
	
		fetch('https://discord.com/api/users/@me', {
		  headers: {
			authorization: `${tokenType} ${accessToken}`,
		  },
		})
		  .then(result => result.json())
		  .then(response => {
			const { username, discriminator } = response;
			req.session.username = `${username}#${discriminator}`;
		  })
		  .catch(console.error);
  },
  (req, res) => {
    req.session.loggedIn = true;
    console.log(req.session.username);
    console.log(req.session);
    res.redirect("/play");
  }
);


app.listen(port, () => {
  console.log("Website is running");
});
