
const fs = require('fs');

module.exports = function (msg, args) {
    // get json settings from file
    const serverInfoString = fs.readFileSync('./channelinfo/' + msg.guild.id + "info.json", 'utf8');
    let serverInfo = JSON.parse(serverInfoString);
    console.log(args);
    if (args.length === 0) {
        msg.channel.send(JSON.stringify(serverInfo.settings));
    } else if (args.length === 2 && serverInfo.settings[args[0]] !== null) {
        console.log("SETTING");
        serverInfo.settings[args[0]] = Boolean.parseBool(args[1]);
        fs.writeFile('./channelinfo/' + msg.guild.id + "info.json", JSON.stringify(serverInfo), (err) => {});
    }
}