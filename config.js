const ayarlar = require('./ayarlar.json')
const config = {
  "token": ayarlar.token,

  "dashboard" : {
    "oauthSecret": "ZXyvpZCrXO4oC8jKdTf02DrAkXAlzSgP", // This is the `client` secret in your bot application page.
    "callbackURL": "https://adlbot.glitch.me/callback",
    "sessionSecret": "super-secret-session-thing",
    "domain": "https://adlbot.glitch.me",
    "port": 8000
  },
};

module.exports = config;