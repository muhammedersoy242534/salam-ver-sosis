const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {

    if(message.author.id !== ayarlar.sahip) 
    return message.reply('bunu kullanmak için bot sahibi olman lazım.');
    const ayarlanan = args.join(` `);
    client.user.setUsername(ayarlanan);
    message.channel.send(`Artık bana **${ayarlanan}** deyin, ismimi başarıyla değiştirdim.<a:ok:589407612227944461>`)
      
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: 'isim-değiştir',
  description: 'Botun ismini değiştirir. Sen yapamazsın :D',
  usage: 'isim-değiştir <isim>'
};