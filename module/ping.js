module.exports.run = function (msg, client, cmsg){
    cmsg.reply("Processing!");
    return "Pong -> Responded";
}
