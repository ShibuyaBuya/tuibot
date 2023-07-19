<<<<<<< HEAD
module.exports.PERMISSION = function (){
    return "PING::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
=======
>>>>>>> bbf623001888e193dd82e0d0158b2941bb972317
module.exports.run = function (msg, client, cmsg){
    cmsg.reply("_Processing!_");
    return "Pong -> *Responded*";
}
