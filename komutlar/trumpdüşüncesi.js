const snek = require('snekfetch');
const Discord = require('discord.js');
const api = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

module.exports.run = (bot, message, args) => {
    snek.get(api).then(r => {
        let embed = new Discord.RichEmbed()
        .setTitle('Trump düşünce jeneratörü bir şey buldu!')
        .setDescription(r.body.message)
        .setColor('RANDOM')
        message.channel.send(embed)
    })
} 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['trumpnotlari', 'trumpnotları', 'trump-notlari'],
 permLevel: 0,
  kategori:'ekstra'
}

exports.help = {
 name: 'trumpdüşüncesi',
 description: "Turp'un düşüncesini öğrenirsiniz.",
 usage: 'trumpdüşüncesi'
};