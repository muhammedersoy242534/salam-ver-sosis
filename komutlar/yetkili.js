
const Discord = require('discord.js');

let botid = ('569833327238971394') 

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Yetkili Komutları`)
    .addField('s!ban','oyuncuları banlar') 
    .addField('s!whitelist-blacklist', 'oyuncuları siyah listeye yada Beyaz listeye alır')
    .addField('s!bot-eklet', 'adminler bu komut ile bot ekleyebilir')
    .addField('s!davetsüre', 'süreli davet')
    .addField('s!sustur-rol-ayarla', 'o roldeki kişi susturulur')
    .addField('s!dil-değiştir', 'TADİLATTA :)')
    .addField('s!onayla', 'botu sunucuda onaylar')
    .addField('s!yetkililer', 'aktif yetkilileri gösterir ')
    .addField('s!uyar', 'uyarı atar')
      .addField('s!mesajat', 'Admin özel')
    .addField('s!kanal-bilgi', 'kanal hakkında bilgi verir')
    .addField('s!uyarı-kaldır', 'oyuncuların uyarısını kaldırır')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/3KeJ8qj) **|** [Bota Oy Ver (Vote)](https://discordbots.org/bot/${botid}/vote) **|** [Web Sitesi]()`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili'],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: 'yetkili'
};
  