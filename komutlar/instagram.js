const Discord = require('discord.js');
const db = require("quick.db");


exports.run = async (client, message, args) => {
 var request = require('request');
   let bilgi = args.slice(0).join(' ');
if (!bilgi) return message.channel.send('Lütfen Instagram kullanan birisini giriniz. Örnek reynmen')

request('https://api.limoncuk.cf/api/instagram/380f603d-c227-4955-ad93-ac5847ee2a18/'+ bilgi +'', function (error, response, body) {
  if (error) return console.log('Hata:', error);
  else if (!error) { 
      var api = JSON.parse(body);
    let embed = new Discord.RichEmbed()
   .addField('Full Adı', api.fullad.data)
  .addField('Biyografı', api.biyografi.data)
.addField('Kullanıcı Adı', api.kullaniciadi.data)
.addField('ID', api.id.data)
.addField('Harici Url', api.hariciurl.data)
.addField('Gönderi', api.gönderi.data)
.addField('Takipçileri/Takip Ettikleri', `${api.takipcileri.data}/${api.takipettikleri.data}`)
    .setColor('RANDOM')
    message.channel.send(embed)
      }
})
    }

;



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'instagram',
  description: 'made by limoncuk!.',
  usage: ''
};
