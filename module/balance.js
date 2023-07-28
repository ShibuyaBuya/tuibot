module.exports.run = async (msg, client, cmsg) => {
    const firebase_module = require('../firebase_module/firebase.js');
    const database = require('../firebase_module/connect.js').database;
    const contact = await cmsg.getContact();
    const number = contact.id._serialized.replace("@c.us", "");
    var data;
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        data = snapshot.val();
        if (data == null) {
            cmsg.reply("You are not registered yet, please register first");
            return;
        }
        var balance = `
Hi *${data.user}*!
    
Your balance: $ *${data.coin}*

Your role is *${firebase_module.roleParse(data.role)}*,
thanks for participating in this project
    `;
        cmsg.reply(balance);
        return;
    });
   return;

}
