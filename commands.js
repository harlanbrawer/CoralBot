
const fetch = require('node-fetch');
require("dotenv").config();
const fs = require('fs');

const respondMessage = require("./commands/respondMessage");

const test = require("./commands/test.js");
const gif = require("./commands/gif.js");
const set = require("./commands/set.js");

const commands = {
    test, gif, set
};

// message handler
module.exports = async function(msg) {
    console.log(msg.content);
    const serverInfoString = fs.readFileSync('./channelinfo/' + msg.guild.id + "info.json", 'utf8');
    let serverInfo = JSON.parse(serverInfoString);

    let tokens = msg.content.split(' ');
    let command = tokens[0];
    console.log(serverInfo.settings.fullenable);
    if (serverInfo.settings.fullenable === true || tokens[0] === '!set')
        if (command.charAt(0) === "!") {
            command = command.substring(1);
            let args = tokens.slice(1);
            commands[command](msg, args);
        } else if (msg.author.id !== process.env.BOTUSERID) {
            respondMessage(msg, tokens);
        }
}