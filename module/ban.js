const firebase_module = require('../firebase_module/firebase.js');
const database = require('../firebase_module/connect.js').database;
module.exports.run = async (msg, client, cmsg) => {
    // make sure the user is authorized to use this command
    const permission = require('../permission.json');
    const contact = await cmsg.getContact();
    const number = contact.id._serialized.replace("@c.us", "");
    if (msg.length < 5) {
        cmsg.reply("Usage: !ban/<number>/<reason>/<time>");
        return;
    }
    if (isNaN(msg[2]) || msg[2] == "Infinity" || msg[2] == "-Infinity") {
        cmsg.reply("Please specify the number of user");
        return;
    }
    try {
        if (msg[4].endsWith("s")) {
            msg[4] = msg[4].replace("s", "");
        } else if (msg[4].endsWith("m")) {
            msg[4] = msg[4].replace("m", "");
            msg[4] = msg[4] * 60;
        } else if (msg[4].endsWith("h")) {
            msg[4] = msg[4].replace("h", "");
            msg[4] = msg[4] * 60 * 60;
        } else if (msg[4].endsWith("d")) {
            msg[4] = msg[4].replace("d", "");
            msg[4] = msg[4] * 60 * 60 * 24;
        }else if (msg[4].endsWith("M")) {
            msg[4] = msg[4].replace("M", "");
            msg[4] = msg[4] * 60 * 60 * 24 * 30;
        } else if (msg[4].endsWith("y")) {
            msg[4] = msg[4].replace("y", "");
            msg[4] = msg[4] * 60 * 60 * 24 * 30 * 12;
        } else {
            cmsg.reply("e.g: 1s, 1m, 1h, 1d, 1M, 1y");
            return;
        }
    } catch (err) {
        cmsg.reply("e.g: 1s, 1m, 1h, 1d, 1M, 1y");
        return;
    }
    if (isNaN(msg[4]) || msg[4] == "Infinity" || msg[4] == "-Infinity") {
        cmsg.reply("e.g: 1s, 1m, 1h, 1d, 1M, 1y");
        return;
    }
    var num = parsePhoneNumber(msg[2]).replace(" ", "");
    const timestampNow = Date.now();

    const secondsToMs = Number(msg[4]) * 1000;
    const timestamp = timestampNow + secondsToMs;
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        //exs = snapshot.exists();
        snap = snapshot.val();
        console.log(snap);
        console.log(permission.ban);
        if (snap.role == 7 || snap.role == 6) {
            database.ref('users_wa/' + num).once('value', (snapshot) => {
                ex = snapshot.exists();
                data = snapshot.val();
                if (ex) {
                    var reason = msg[3];
                    database.ref('users_wa/' + num + "/aquamen/status").update({ banned: true, time: timestamp, reason: reason });
                    client.sendMessage(num + "@c.us", `
You've been banned from using this bot!
Reason: ${reason}
wait until ${convertMsToTime(secondsToMs)}

If you think this is a mistake, please contact the admin.
                    `);
                    cmsg.reply(`User ${num} has been banned for ${convertMsToTime(secondsToMs)}`);
                    return;
                } else {
                    cmsg.reply("User not found");
                    return;
                }
            });
        } else {
            cmsg.reply("You are not authorized to use this command");
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
