const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",`= Boss Genel Komutları =
​
${prefix}sunucutanıt    ::  Destek Sunucusunda Sunucunu Tanıtır.
${prefix}temke-at       ::  tekme atarsınız.
${prefix}canlıcestek    ::  Yetkililer İle İletişime Geçersiniz.
${prefix}girişçıkış     ::  hoşgeldin görüşürüz resimleri ayarlar.
${prefix}sayaç          ::  sayaç ayarlar.
${prefix}sigara         ::  Şakadan Sigara İçersiniz.
${prefix}triggered      ::  Triggeredlenirsiz.
${prefix}sahip          ::  Sahip Komutlarını Gösterir.
${prefix}saat           ::  Saatinizi Algılar Ve Size Söyler
${prefix}sev            ::  Birisini Seversiniz.
${prefix}rol-ver        ::  Kişiye Rol Verir.
${prefix}otorol         ::  Otorol Ayarlar.
​
# Komutlar hakkında yardım almak icin    ${prefix} <komut ismi>`);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} =
​
Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`);
    }
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'genel',
  description:'anakomutları gösterir',
  usage: 'genel'
};
//
// 
// ÇALMAYIN KODU HA! YSF TEAM'S
// TÜM HAKLARI SAKLIDIR
//
   