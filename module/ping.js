
module.exports.PERMISSION = function (){
    return "PING::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg){
    cmsg.reply("_Processing!_");
    return "Pong -> *Responded*";
}
