const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
const embedyardim = new Discord.RichEmbed()
.setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
         .setTitle(" Yetkili Komutları ")
         .setColor("RANDOM")
.addField('.istatistik-Bot istatistiliğini gösterir.')
.addField('.anket'-'Anket açar.')
.addField('.ban'-'İstediğiniz kişiyi sunucudan yasaklar.')
.addField('.kick' , 'İstediğiniz kişiyi sunucudan atar.')
.addField('.sustur' , 'İstediğiniz kişiyi susturur.')
.addField('.temizle' , ' Mesajları siler.')
.addField('.uyar' , 'İstediğiniz kişiye uyarı verir.')
.addField('.duyuruyap' , 'Sunucunuzda duyuru yapmanızı sağlar.')
.addField('.oylama' , 'Oylama yapar.')
.addField('.unload' , 'Yetkili bilir.')
.addField('.unban' , 'Ban kaldırır.')
.addField('.terfi', 'Kullanıcıyı terfi eder.')

if (!params[0]) {
const commandNames = Array.from(client.commands.keys());
const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
message.channel.send(embedyardim);
} else {
let command = params[0];
if (client.commands.has(command)) {
command = client.commands.get(command);
message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
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
  name: 'yetkili',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'yetkili'
};