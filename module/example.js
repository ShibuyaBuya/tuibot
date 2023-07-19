
module.exports.PERMISSION = function (){
    return "EXAMPLE::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg){
    cmsg.reply(`
This is an example -> 

*${msg}*
*${client}*
*${cmsg}*`);
}
