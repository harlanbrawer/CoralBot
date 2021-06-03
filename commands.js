
const fetch = require('node-fetch');
require("dotenv").config();
const fs = require('fs');

const respondMessage = require("./commands/respondMessage");

const test = require("./commands/test.js");
const gif = require("./commands/gif.js");
const set = require("./commands/set.js");
const remember = require("./commands/remember.js");
const rem = remember;
const recall = require("./commands/recall.js");
const rec = recall;
const help = require("./commands/help.js");

const commands = {
    test, gif, set, remember, rem, recall, rec, help
};

// message handler
module.exports = async function(msg) {
    console.log(msg.content);
    let serverInfoString;
    try {
        serverInfoString = fs.readFileSync('./channelinfo/' + msg.guild.id + "info.json", 'utf8');
    } catch(err) {
        serverInfoString = JSON.stringify(getBlankChannelJson(msg.guild));
        fs.writeFile('./channelinfo/' + msg.guild.id + "info.json", serverInfoString, (err) => {});
    }
    let serverInfo = JSON.parse(serverInfoString);

    let tokens = msg.content.split(' ');
    let command = tokens[0];
    if (serverInfo.settings.fullenable === true || tokens[0] === '!set')
        if (command.charAt(0) === "!") {
            command = command.substring(1);
            let args = tokens.slice(1);
            commands[command](msg, args);
        } else if (msg.author.id !== process.env.BOTUSERID) {
            respondMessage(msg, tokens);
        }
}
function getBlankChannelJson(channel) {
    let blankChannelJson = {
        "info": {
            "name": channel.name,
            "id":channel.id,
        },
        "settings": {
            "fullenable": false,
            "sentencetriggers": false,
            "wordtriggers": false,
            "nonepiece": false,
            "gifs": false,
            "lobby": false,
            "general":"",
            "bottest":""
        }
    };
    return blankChannelJson;
}