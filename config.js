const ayarlar = require('./ayarlar.json')
const config = {
  "token": ayarlar.token,

  "dashboard" : {
    "oauthSecret": "XBx8HtswD6B-wmJAETvRx3vEYIJUepoF", // This is the `client` secret in your bot application page.
    "callbackURL": "https://saitokontrol.glitch.me/callback",
    "sessionSecret": "super-secret-session-thing",
    "domain": "https://saitokontrol.glitch.me",
    "port": 8000
  },
};

module.exports = config;