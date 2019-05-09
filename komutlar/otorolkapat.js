const Discord = require('discord.js');
const fs = require('fs');
const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {
  	let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
    	let otorolkapat = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
		if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Otorolü Ayarlamadığın İçin Otorolü Kapatamazsın!`)
				.setColor("RED")
				.setTimestamp('Ayarlamak İçin //otorol @rol')
			message.channel.send({embed})
			return
		}
		delete sunucuyaözelayarlarOtorol[message.guild.id]
		fs.writeFile("./otorol.json", JSON.stringify(sunucuyaözelayarlarOtorol), (err) => {
			console.log(err)
		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Otorol Başarıyla Kapandı !`)
			.setColor("GREEN")
			.setTimestamp()
		message.channel.send({embed})
		return
	}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['otorolsıfırla', 'kapat otorol', 'otorol-kapat'],
  permLevel: 0
};

exports.help = {
  name: 'otorolkapat',
  description: 'Slots oyunu oynar',
  usage: 'otorolkapat'
};