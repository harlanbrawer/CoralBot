
const fs = require('fs');

function createMemoryJson(user) {
    return ({
        "id": user.id,
        "username": user.username,
        "tag": user.discriminator,
        "memory": {}
    });
}

function addMemory(json, category, memory) {
    if (!json["memory"][category]) {
        json["memory"][category] = [];
    }
    json["memory"][category].push(memory);
}

module.exports = function (msg, args) {
    // get json settings from file

    if (args.length < 2) {
        return;
    }
    else {
        if (args[0] === "me") {
            let url = './remembered/' + msg.author.id + 'mem.json';
            let memoryJson;
            try {
                const memoryString = fs.readFileSync(url, 'utf8');
                memoryJson = JSON.parse(memoryString);
            } catch(err) {
                memoryJson = createMemoryJson(msg.author);
            }
            let memCategory = args[1];
            args.splice(0, 2);
            let memoryToAdd = args.join(' ');
            addMemory(memoryJson, memCategory, memoryToAdd);
            
            fs.writeFile(url, JSON.stringify(memoryJson), (err) => {});
        } else {
            let url = './remembered/memory.json';
            const memoryString = fs.readFileSync(url, 'utf8');
            let memoryJson = JSON.parse(memoryString);

            let memCategory = args[0];
            args.shift();
            let memoryToAdd = args.join(' ');
            addMemory(memoryJson, memCategory, memoryToAdd);

            fs.writeFile(url, JSON.stringify(memoryJson), (err) => {});
        }
    }

}