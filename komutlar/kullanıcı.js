const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",`=  ${client.user.username} Kullanıcı Komutları =

${prefix}1vs1 : Kullanım : ${prefix}1vs1 <@kullanıcı> <@kullanıcı>
${prefix}afk : Kullanım : ${prefix}afk sebep
${prefix}ailemiz : Kullanım : ${prefix}ailemiz
${prefix}aşçı : Kullanım : ${prefix}aşçı Mesaj
${prefix}atasözü : Kullanım : ${prefix}atasözü
${prefix}atatürk-çerçeve : Kullanım : ${prefix}atatürk-çerçeve
${prefix}aşkölçer : Kullanım : ${prefix}aşkölçer <@kullanıcı>
${prefix}davet : Kullanım : ${prefix}davet
${prefix}dm-at : Kullanım : ${prefix}dm-at <@kullanıcı id> Mesaj
${prefix}emojiyazı : Kullanım : ${prefix}emojiyazı Mesaj
${prefix}espri : Kullanım : ${prefix}espri
${prefix}istatistik : Kullanım : ${prefix}istatistik
${prefix}kafasınasık : Kullanım : ${prefix}kafasınasık <@kullanıcı>
${prefix}kaçcm : Kullanım : ${prefix}kaçcm
${prefix}kısalt : Kullanım : ${prefix}kısalt <URL>
${prefix}ping : Kullanım : ${prefix}ping
${prefix}rolbilgi : Kullanımı : ${prefix}rolbilgi <@Rol>
${prefix}servericon : Kullanım : ${prefix}servericon
${prefix}winner : Kullanım : ${prefix}winner
${prefix}yapımcım : Kullanım : ${prefix}yapımcım
${prefix}öp : Kullanım : ${prefix}öp <@kullanıcı>
${prefix}şifre : Kullanım : ${prefix}şifre uzunluk


`);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} =

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
  name: 'kullanıcı',
  description: 'Komut kategorilerini gösterir.',
  usage: 'kullanıcı'
};