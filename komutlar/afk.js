
Save New Duplicate & Edit Just Text Twitter
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let user = message.author
  let sebep = args.join(" ")
  
  if (!sebep) return message.channel.send(`Bir sebep yazmalısın.`)
  
  db.set(`afk_${user.id}`, sebep)
  message.channel.send(`Artık \`${sebep}\` sebebiyle AFK'sın.`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk',
  description: "AFK olmanızı sağlar.",
  usage: 'afk <sebep>'
}