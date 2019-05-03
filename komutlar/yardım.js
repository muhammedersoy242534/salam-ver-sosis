const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",` ${client.user.username} YARDIM KOMUTLARI :

${prefix}eğlence              :: Eğlence Komutlarını Gösterir
${prefix}kullanıcı            :: Kullanıcı Komutlarını Gösterir
${prefix}yetkili              :: Yetkili Komutlarını Gösterir
${prefix}ekstra               :: Ekstra Komutlarını Gösterir
${prefix}müzik              :: Müzik Komutlarını Gösterir

# Komutlar Hakkında Yardım Almak İçin ${prefix}yardım <komut ismi>
`);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('ascii', `= ${command.help.name} =

Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`);
    }
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help","h","y","halp"],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Komut deniyom mk.',
  usage: 'yardım'
};