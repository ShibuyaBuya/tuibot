
module.exports.PERMISSION = function (){
    return "SET::8; SYSTEM_MODULE; _IMPORTANT; CHANGE;  *;";
}
module.exports.run = function (msg, client, cmsg){
    cmsg.reply("Coming soon");
}
