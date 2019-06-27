const Discord = require('discord.js');
const db = require("quick.db");


exports.run = async (client, message, args) => {
 var request = require('request');
   let bilgi = args.slice(0).join(' ');
if (!bilgi) return message.channel.send('Vikipediada aratmak istediğiniz kelimeyi giriniz.')

request('https://api.limoncuk.cf/api/vikipedia/380f603d-c227-4955-ad93-ac5847ee2a18/'+ bilgi +'', function (error, response, body) {
  if (error) return console.log('Hata:', error);
  else if (!error) { 
      var api = JSON.parse(body);
    let embed = new Discord.RichEmbed()
    .setTitle(api.baslik)
    .setDescription(api.aciklama)
    .setThumbnail(api.resim)
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
  name: 'vikipedia',
  description: 'made by limoncuk!.',
  usage: 'xx'
};