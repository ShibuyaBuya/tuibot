module.exports.PERMISSION = function (){
    return "REGISTER::23; SYSTEM_MODULE; _IMPORTANT; REG; *;";
}
module.exports.run = async (msg, client, cmsg) => {
    const firebase = require('../firebase_module/firebase.js');
    const contact = await cmsg.getContact();
    const number = contact.id._serialized;
    const checkAccount = firebase.checkAccount(number.replace("@c.us", ""));
    if (checkAccount == 0){
        cmsg.reply("Error while checking account, try again later");
        return;
    }else if (checkAccount == 1){
        cmsg.reply("You already registered");
        return;
    }
    if (msg.length == 2){
        cmsg.reply("How to use: tui/register/<password>");
        return;
    }
    const register = firebase.register(number.replace("@c.us", ""), msg[2]);
    if (register == 0){
        cmsg.reply("Error while registering account, try again later");
        return;
    }else if (register == 1){
        cmsg.reply("Register success");
        return;
    }else{
        cmsg.reply(`${register}`);
        return;
    }
}