const ytdl = require('ytdl-core');

module.exports.run = async(Octopus, message, args) => {
    var url = 'https://www.youtube.com/watch?v=i5tqSinv5LM';
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("Lütfen herhangi bir ses kanalına girin.");
    if(message.guild.voiceConnection) return message.channel.send("Şuanda ses kanalındayım.");
    
    var connection = await voiceChannel.join();
    message.channel.send("USMAN AĞA COMİNG.")
        .then(msg => {
            msg.delete(10000)
        });

    const dispatcher = connection.playStream(ytdl(url))
        .on('end', () => {
            voiceChannel.leave();
        });
    dispatcher.setVolumeLogarithmic(5 / 5);
}

process.on('unhandledRejection', error => console.error(`İzin Hatası:\n${error}`));

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "özel",
};

exports.help = {
  name: 'usmanaga',
  description: 'Acaba ne?',
  usage: 'earrape'
};