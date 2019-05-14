module.exports = member => {
    let username = member.user.username;
    member.sendMessage('Hg ');
    member.guild.defaultChannel.send('hg '+username+'');
};
