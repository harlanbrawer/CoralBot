const fs = require('fs');

module.exports = function (msg, args) {
    let helpMessage;
    if (args.length === 0) {
        helpMessage = fs.readFileSync('./help.txt', 'utf8');
    }

    msg.channel.send(helpMessage);
}