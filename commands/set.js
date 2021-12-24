
const fs = require('fs');

module.exports = function (msg, args) {
    // get json settings from file
    const serverInfoString = fs.readFileSync('./channelinfo/' + msg.guild.id + "info.json", 'utf8');
    let serverInfo = JSON.parse(serverInfoString);
    if (args.length === 0) {
        msg.channel.send(JSON.stringify(serverInfo.settings));
    } else if (args.length === 2 && serverInfo.settings[args[0]] !== null && serverInfo[args[0]]) {
        serverInfo.settings[args[0]] = (args[1] === "true");
        fs.writeFile('./channelinfo/' + msg.guild.id + "info.json", JSON.stringify(serverInfo), (err) => {});
    }
}