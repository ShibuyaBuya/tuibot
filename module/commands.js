const os = require('os');
const fs = require('fs');
const path = require('path');
const busybox = require('../js_busybox/busybox.js');

const { run } = require('./autoreply.js');
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
        const contact = await clientMsg.getContact();
        const id = await contact.id;
        const idGood = id._serialized.replace("@c.us", "");
        if (msg[1] == "register") {
            const { run } = require('./register.js');
            run(msg, client, clientMsg);
            return;
        }
        const checkAccount = firebase_module.checkAccount(`${idGood}`);
        console.log(checkAccount);
        if (!checkAccount) {
            clientMsg.reply("Account not registered yet, please register first");
            return;
        }
        if (msg[1] == "session") {
            const { run } = require('./session.js');
            run(msg, client, clientMsg);
            return;
        }
        if (msg[1] == "login"){
            const { run } = require('./login.js');
            run(msg, client, clientMsg);
            return;
        }
        const checkLogin = firebase_module.checkLoginState(`${idGood}`);
        if (checkLogin == 0) {
            clientMsg.reply("セッションでエラーが発生しました。ログアウトして再度ログインしてください。");
            return;
        } else if (checkLogin == 404) {
            clientMsg.reply("セッションが見つかりませんでした。ログインしてください。");
            return;
        }
        if (fs.existsSync(`./module/${msg[1]}.js`)) {
            const { run } = require(modul);
            run(msg, client, clientMsg);
        } else {
            clientMsg.reply(`
${msg}: Maybe the command is not added or maintenance, Thank you :)
            `);
        }
    }



}
