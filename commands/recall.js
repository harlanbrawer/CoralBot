
const fs = require('fs');

module.exports = function (msg, args) {
    // get json settings from file

    if (args.length < 1) {
        return;
    }
    else {
        let url;
        if (args[0] === "me") {
            url = './remembered/' + msg.author.id + 'mem.json';
            args.splice(0, 1);
        } else {
            url = './remembered/memory.json'
        }
        let memoryJson;
        try {
            const memoryString = fs.readFileSync(url, 'utf8');
            memoryJson = JSON.parse(memoryString);
        } catch(err) {
            msg.channel.send("You do not have any memories stored.");
            return;
        }
        let memCategory = args[0];
        let recallMsg = "Recalling your memories...\n";
        if (memCategory === "all") {
            let jsonToPrint = memoryJson["memory"];
            for (const key in jsonToPrint) {
                recallMsg += "Here are your " + key + " memories:\n"
                let i = 1;
                for (const mem of jsonToPrint[key]) {
                    recallMsg += (i + ": " + mem + "\n");
                    i++;
                }
            }
        } else {
            let jsonToPrint = memoryJson["memory"][memCategory];
            recallMsg += "Here are your " + memCategory + " memories:\n"
            let i = 1;
            for (const mem of jsonToPrint) {
                recallMsg += (i + ": " + mem + "\n");
                i++;
            }
        }

        msg.channel.send(recallMsg);
    }
}