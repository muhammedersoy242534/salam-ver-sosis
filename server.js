//Bu Proje Tamamen bana Aittir.
//Başka Amaçlarla Dağıtılması veya Çoğaltılması yasaktır.

//Şimdi Başlayalım

//1. Ders Bot.js ~Ne İşe Yarar~ Başlıyor.
//İlk Önce Eğer botunuzu 7/24 Aktif Yapmak İçin Bu Kodlara Girelim
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
      console.log(`Birisi Paneldde Geziniyor.`);//Dosyalar Üzerinde Birşeyler Değiştiğinde Bu Mesajı gönder.
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//modüllerimizi Girelim En Öncelikle Bu modülü giriniz
const Discord = require('discord.js');
//bu Herzaman En Üste Kalsın Daha sonra Sıkıntı olmasın
const client = new Discord.Client();//cilent Kısmını Değiştire bilirsiniz Ama Eğer bir Komut Eklediğinizde Onun Başını `=` İşaretinin önündekini yapmanız gerekmektedir.
const ayarlar = require('./ayarlar.json');//ayarlar.json klasörünü tanımlayalım.
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
//Bu Modüller Her zaman En üste dursun.

let sahip = ('474822301117055006')//Kullanıcı İD niz.
let prefix = '.' // Prefixiniz.
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);//moment modülü lazımdır. Komutlar Yüklendiğinde Öncesine O Saati Yazar.
};

client.commands = new Discord.Collection();//Komutu Yükler.
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {//FS öodülü lazımdır. ./komutlar/ Klasörünü yükler.
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);//Yüklenecek Komutu Söyler.
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);// Yüklenen Komut XXXX Der
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {//Komutu Tekrar Yüklendiğinde Olacağı
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {//Komut Yüklendiğinde
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {//Komut yüklemeyi Kaldırdığında
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }//Komutlar Klasöründeki Kodların Prem Levellerinin Ne işe Yaradığı Söylenir.
  let permlvl = 0; // Herkes Kullana Bilir
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2; // Sadece Ban Yetkisi Olanların Ve Üstün Olan kişilerin kullanacağı Kişiler
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;// Sadece adminler
  if (message.author.id === ayarlar.sahip) permlvl = 4;// Sadece ayarlar.sahip teki kişi kullana bilir
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;//burayı Ellemeyin

client.on('warn', e => {//Error Veren kodların consola aktarmasına Yarar
  console.log(chalk.bgYellow(e.replace(regToken, 'Dikkat Dikkat Kod ERROR VERDİ')));//Kod ERROR verdiğinde Söyleyeceği/Yazacağı 
});

client.on('error', e => {//Error Veren kodların consola aktarmasına Yarar
  console.log(chalk.bgRed(e.replace(regToken, 'Dikkat Dikkat Kod ERROR VERDİ')));//Kod ERROR verdiğinde Söyleyeceği/Yazacağı 
});

////////////////////////////


client.login(ayarlar.token)//bot.js Yi Çalıştırmamız Lazım O yüzden bu gelmektedir. Her zaman En Altta Olsun Eğer altında Kod olursa Yüklemeyecektir. Yani Nokta Değerini görür.

