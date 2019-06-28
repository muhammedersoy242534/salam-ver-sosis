exports.run = async (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!message.member.voiceChannel) { return message.channel.send("Ses kanalında değilsin bak! Beni yalnız olmaya zorlama!"); }

  const permissions = message.member.voiceChannel.permissionsFor(message.guild.me);
  if (permissions.has("CONNECT") === false) { return message.channel.send(":x: Ses kanalındanÇıkmak için yeterli izne sahip değilim"); }
  if (permissions.has("SPEAK") === false) { return message.channel.send("Kanaldan çıkmam için bir kanala gir"); }

  message.member.voiceChannel.leave();
  return message.channel.send(`<a:ok:589407612227944461>Şimdi bu kanaldan çıkış yaptım: ${message.member.voiceChannel}.<a:ok:589407612227944461>`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ['çık'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
    kategori: 'özel',
};

exports.help = {
  name: "çık",
  description: "Lefts the VC that you are in.",
  usage: "çık",
  usageDelim: "",
};