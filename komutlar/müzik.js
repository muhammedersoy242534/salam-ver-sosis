const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",`=  ${client.user.username} Müzik Komutları =

${prefix}çal : Kullanım : ${prefix}çal <şarkı adı>
${prefix}çalan : Kullanım : ${prefix}çalan
${prefix}geç : Kullanım : ${prefix}geç
${prefix}ses : Kullanım : ${prefix}ses <ses>
${prefix}duraklat : Kullanım : ${prefix}duraklat
${prefix}devam : Kullanım : ${prefix}devam
${prefix}sıra : Kullanım : ${prefix}sıra

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
  name: 'müzik',
  description: 'Komut kategorilerini gösterir.',
  usage: 'müzik'
};