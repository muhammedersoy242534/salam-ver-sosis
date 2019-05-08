const { Canvas } = require("canvas-constructor");
const { get } = require("snekfetch");

module.exports.run = (bot, message, args) => {
    const serverSize = message.guild.memberCount;
    const botCount = message.guild.members.filter(m => m.user.bot).size;
    const humanCount = serverSize - botCount;
    const ad = message.guild.name;
    const sahip = message.guild.owner
    const kanal = message.guild.defaultChannel
    const bolge = message.guild.region
    const id = message.guild.id
        const canvas = new Canvas(400, 250)
        .setColor("#2C2F33")
        .addRect(0, 0, 400, 250)
        .setColor("#ffffff")
        .setTextFont('30px Impact')
        .addText(`Sunucu Bilgileri`, 70, 30)
        .setTextFont('15px Impact')
        .addText(`Sunucu Adı: ${ad}`, 10, 125)
        .addText(`Sunucu İdsi: ${id}`, 10, 150)
        .addText(`Ana Kanalı: ${kanal}`, 10, 175)
        .addText(`Üye Sayısı: ${serverSize}`, 10, 200)
        .addText(`Sunucu Bölgesi: ${bolge}`, 10, 225)
        .save();
        
        message.channel.send({files: [{ attachment: canvas.toBuffer(), name: "Account.png"}]});
   ;
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-üye","sunucuü","sunucubilgi","sunucu-bilgi"],
  permLevel: 0
};

module.exports.help = {
  name: "sunucubilgi",
  description: "Sunucudaki üye bilgilerini gösterir.",
  usage: "sunucuüye"
};