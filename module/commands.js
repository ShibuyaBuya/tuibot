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
        if (msg[1] == "menu") {
            const { run } = require('./menu.js');
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
            // check if user is banned or not
            const data = snapshot.val();
            if (data.aquamen.status.banned == true) {
                const time = data.aquamen.status.time;
                const reason = data.aquamen.status.reason;
                const timestampNow = Date.now();
                if (timestampNow > time) {
                    database.ref('users_wa/' + idGood + "/aquamen/status").update({ banned: false, time: 0, reason: "" });
                    clientMsg.reply("You are not banned anymore");
                    return;
                } else {

                    clientMsg.reply(`
You are banned from using this bot!
Reason: ${reason}
Time left: ${convertMsToTime(time - timestampNow)}

if you want to appeal, please contact the developer
                    `);
                    return;
                }
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
function padTo1Digits(num) {
    return num.toString().padStart(1, '0');
}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function padTo4Digits(num) {
    return num.toString().padStart(4, '0');
}
function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);
    

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
    days = days % 30;
    months = months % 12;


    return ` ${padTo1Digits(years)}Years ${padTo1Digits(months)}Months ${padTo1Digits(days)}Days ${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
        seconds,
    )}`;
}
