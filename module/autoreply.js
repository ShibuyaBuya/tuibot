module.exports.PERMISSION = function (){
    return "AUTOREPLY23; SYSTEM_MODULE; NO_NEED; *;";
}
module.exports.run = function (msg, client, cmsg, ct){
    const type = client.getChats();
    if (type == ct.SOLO){
	cmsg.reply("Sorry this service is no longer available");
    }
}
