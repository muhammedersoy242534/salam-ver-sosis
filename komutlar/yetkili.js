const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
const embedyardim = new Discord.RichEmbed()
.setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
         .setTitle(" Yetkili Komutları ")
         .setDescription('')
         .setColor()
.addField(' • istatistik      :: Bot Istatistiligini Gosterir.')
.addField('• anket :: Anket Acar.')
.addField(' • ban   :: İstediğiniz kişiyi sunucudan yasaklar.')
.addField('  • kick    :: İstediğiniz kişiyi sunucudan atar.')
.addField(' • sustur  :: İstediğiniz kişiyi susturur.')
.addField(' • temizle :: Mesajları siler.')
.addField(' • uyar    :: İstediğiniz kişiye uyarı verir.')
.addField(' • duyuruyap   :: Sunucunuzda duyuru yapmanızı sağlar.')
.addField('  • kilit :: Sunucu kilitler.')
.addField(' • unload :: Yetkili Bilir.')
.addField(' • unban  :: Ban Kaldirir.')
.addField('  • terfi  :: Kullaniciyi Terfi Eder.')
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