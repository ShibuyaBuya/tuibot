module.exports.PERMISSION = function (){
    return "REGISTER::23; SYSTEM_MODULE; _IMPORTANT; REG; *;";
}
module.exports.run = async (msg, client, cmsg) => {
    const firebase = require('../firebase_module/firebase.js');
    const contact = await cmsg.getContact();
    const number = contact.id._serialized;
    /*const checkAccount = firebase.checkAccount(number.replace("@c.us", ""));
    if (checkAccount == true){
        cmsg.reply("You already registered");
        return;
    }*/
    if (msg.length == 2){
        cmsg.reply("How to use: !register/<username>");
        return;
    }
    const register = firebase.register(number.replace("@c.us", ""), msg[2]);
    console.log(register);
    cmsg.reply(register);
    return;
}