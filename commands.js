
const fetch = require('node-fetch');
require("dotenv").config();

const respondMessage = require("./commands/respondMessage");

const test = require("./commands/test.js");
const gif = require("./commands/gif.js");

const commands = {
    test, gif
};

// message handler
module.exports = async function(msg) {
    console.log(msg.content);
    // msg.reply('Reply to message');
    if (msg.channel.id === process.env.TESTCHANNELID || true) {
        let tokens = msg.content.split(' ');
        let command = tokens.shift();
        if (command.charAt(0) === "!") {
            command = command.substring(1);
            commands[command](msg, tokens);
        } else if (msg.author.id !== process.env.BOTUSERID) {
            respondMessage(msg, tokens);
        }
    }
}