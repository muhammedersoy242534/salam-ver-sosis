const ayarlar = require('./ayarlar.json')
const config = {
  "token": ayarlar.token,

  "dashboard" : {
    "oauthSecret": "", // Projenizin ana sayfasında client secret var onu yapışstır.
    "callbackURL": "https://adlbot.glitch.me/callback",//proje adınıza göre düzenledikten sonra Bunları uygula: https://i.hizliresim.com/GGQL4Z.jpg | https://i.hizliresim.com/ZngGnG.jpg
    "sessionSecret": "super-secret-session-thing",// buraya elleme yukarısı önemli
    "domain": "https://adlbot.glitch.me",//burasıda proje ismine göre
    "port": 8000
  },
};

module.exports = config;