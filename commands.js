
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

let prefix = 'c!';

// message handler
module.exports = async function(msg) {
    console.log(msg.content);

    // remove messages from art only no text
    if (msg.guild.id === '564324748348358697' && msg.channel.id === '839600821540094082') {
        msg.delete();
        return;
    }
    
    let serverInfoString;
    try {
        serverInfoString = fs.readFileSync('./channelinfo/' + msg.guild.id + "info.json", 'utf8');
    } catch(err) {
        if (!fs.existsSync('./channelinfo')) {
            fs.mkdirSync('./channelinfo');
        }
        serverInfoString = JSON.stringify(getBlankChannelJson(msg.guild));
        fs.writeFile('./channelinfo/' + msg.guild.id + "info.json", serverInfoString, (err) => {});
    }
    let serverInfo = JSON.parse(serverInfoString);

    let tokens = msg.content.split(' ');
    let command = tokens[0];
    if (serverInfo.settings.fullenable === true || tokens[0] === prefix + 'set')
        if (command.substring(0, prefix.length) === prefix) {
            command = command.substring(2);
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
            "fullenable": true,
            "sentencetriggers": true,
            "wordtriggers": true,
            "nonepiece": true,
            "gifs": true,
            "lobby": true,
            "general":"",
            "bottest":""
        }
    };
    return blankChannelJson;
}