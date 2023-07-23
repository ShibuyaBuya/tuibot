const os = require('os');
const fs = require('fs');
const path = require('path');
const busybox = require('../js_busybox/busybox.js');


// Mendatopatkan PWD (working directory)
const pwd = path.resolve(__dirname);
const platform = os.platform();
const release = os.release();
module.exports.PERMISSION = function () {
    return "COMMANDS::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg) {
    return "don't use this";
}
module.exports.commands = async (msg, client, clientMsg) => {
    var result = "";
    const modul = `./${msg[1]}.js`;
    if (msg[1] == "whoami") {
        clientMsg.reply(`
# *WHOAMI*
Platform ${platform}
Release ${release}
_CentOS_
User ${busybox.whoami}
This command is built-in, not a module. :)
`);
    } else {
        const firebase_module = require('../firebase_module/firebase.js');
        const database = require('../firebase_module/connect.js').database;
        const contact = await clientMsg.getContact();
        const id = await contact.id;
        const idGood = id._serialized.replace("@c.us", "");
        if (msg[1] == "register") {
            const { run } = require('./register.js');
            run(msg, client, clientMsg);
            return;
        }

        //console.log(checkAccount);
        var exs;
        database.ref('users_wa/' + idGood).once('value', (snapshot) => {
            exs = snapshot.exists();
            if (exs == false) {
                clientMsg.reply("Account not registered yet, please register first");
                return;
            }
            if (fs.existsSync(`./module/${msg[1]}.js`)) {
                const { run } = require(modul);
                run(msg, client, clientMsg);
                return;
            } else {
                clientMsg.reply(`
${msg}: Maybe the command is not added or maintenance, Thank you :)
            `);
                return;
            }

        });

    }
    return;


}
