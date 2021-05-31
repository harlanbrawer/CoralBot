
responses = {
    'That\'s very interesting': 'You are very interesting',
    'Who\'s side?': 'R side!',
    'Oh no they got Cody!': 'Oh no they got Cody...',
};

wordtriggers = {
    'finale': {text: '', files: ['./imagebank/finalemenace.png'] },
    'save': {text: 'But I still have all my hair...?', files: [] },
};

module.exports = function (msg, args) {
    if (responses[msg.content]) {
        msg.channel.send(responses[msg.content]);
    } else {
        for (let key in wordtriggers) {
            if (msg.content.indexOf(key) !== -1) {
                msg.channel.send(wordtriggers[key].text, {files: wordtriggers[key].files});
            }
        }
    }
}