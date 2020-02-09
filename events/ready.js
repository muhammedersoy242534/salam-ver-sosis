const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = async client => {
  client.appInfo = await client.fetchApplication();
    setInterval( async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);
  client.user.setStatus("LISTENING");
  client.user.setGame(`${prefix}yardım + ${client.guilds.size} Sunucu + ${client.users.size} Kullanıcı!`);  
    require("../util/dashboard.js")(client);
};