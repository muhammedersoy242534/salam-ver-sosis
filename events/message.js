
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
module.exports = message => {
db.fetch(`prefix_${message.guild.id}`).then(prefix => { 
if(!prefix || prefix === null) prefix = ayarlar.prefix
else prefix = prefix
  
if(!message.content.startsWith(prefix)) return;
let client = message.client;
db.fetch(`karaliste_${message.author.id}`).then(karaliste => {
  if(karaliste === "aktif") return message.channel.send(':x: | Karalistedesin!\nBilgi Almak İçin ' + client.users.get(ayarlar.sahip).tag + '\'a Ulaşınız')
  else {
db.fetch(`calisimmi_${message.channel.id}`).then(izin => {
  if(izin === "aktif") return;
  else {
  if (message.author.bot) return;
    
  if(!message.content.startsWith(prefix)) return;
    
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  }})}})})}
  


