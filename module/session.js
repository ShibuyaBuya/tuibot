module.exports.PERMISSION = () => {
    return "SESSION::23; *;"
}
module.exports.run = async (msg, client, cmsg) => {
    const contact = await cmsg.getContact();
    const id = contact.id._serialized.replace("@c.us", "");
    const firebase_module = require('../firebase_module/firebase.js');
    const database = require('../firebase_module/connect.js').database;
    if (msg[2] == "list"){
       await database.ref('users_wa/' + id + '/session').once('value', (snapshot) => {
            const check = snapshot.val();
            if (check == null) {
                client.sendMessage(msg[0], "You don't have any session");
                return;
            } else if (check == undefined) {
                client.sendMessage(msg[0], "You don't have any session");
                return;
            } else if (check == "") {
                client.sendMessage(msg[0], "You don't have any session");
                return;
            } else if (check != null || check != undefined || check != "") {
                const session = Object.keys(check);
                console.log(session);
                console.log(check);
                var text = "Session available on your account:\n";
                for (var i = 0; i < session.length; i++) {
                    console.log(session[i]);
                    console.log(check[session[i]])
                    const key = session[i];
                    text += `- Session Number Phone: *${check[key].session_data.number}*,\n		 >> Expired: ${check[key].session_status.expired}\n`;
                }
                cmsg.reply(text);
            }
        });
    }else{
        cmsg.reply("How to use: tui/session/<option>\n - ex: tui/session/list");
    }
}