
const fetch = require('node-fetch');

module.exports = async function (msg, args) {
    if (args.length <= 1) {
        msg.channel.send("Usage: !gif {search_term}");
        return;
    }
    let keywords = args.join(" ");
    let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORAPIKEY}&limit=8`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    msg.channel.send(json.results[0].url);
}