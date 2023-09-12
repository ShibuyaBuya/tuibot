module.exports.run = async (msg, client, cmsg) => {
    // import module same like ban.js
    const firebase_module = require('../firebase_module/firebase.js');
    const database = require('../firebase_module/connect.js').database;
    // make sure the user is authorized to use this command
    const permission = require('../permission.json');
    const contact = await cmsg.getContact();
    const number = contact.id._serialized.replace("@c.us", "");
    if (msg.length < 3) {
        cmsg.reply("Usage: !unban/<number>");
        return;
    }
    var num = parsePhoneNumber(msg[2]).replace(" ", "");
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        var snap = snapshot.val();
        if (snap.role == 7){
            database.ref('users_wa/' + num).once('value', (snapshot) => {
                  if (snapshot.exists()){
                    var snap = snapshot.val();
                    if (snap.aquamen.status.banned == true){
                        database.ref('users_wa/' + num + '/aquamen/status').update({banned: false});
                        cmsg.reply("User unbanned");
                        client.sendMessage(num+"@c.us", "Congratulation, you've been unbanned!\nNote: do not make the same mistake again!");
                        return;
                    }else{
                        cmsg.reply("User not banned");
                        return;
                    }
                  }else{
                    cmsg.reply("User not found");
                    return;
                  }
            });
        }else{
            cmsg.reply("You are not allowed to use this command");
            return;
        }
    });
}
function parsePhoneNumber(string) {
    var result = "";
    for (var i in string) {
        if (!isNaN(string[i])) {
            result += string[i]
        }
    }
    return result;
}
