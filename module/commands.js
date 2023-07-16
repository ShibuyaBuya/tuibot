module.exports.commands = function (msg, client, clientMsg) {
    var result;

    if (msg[1] == "menu") {
        result = `
# *MENU*
@ tui/menu - Menu
@ tui/whoami - Whoami, usage: tui/whoami
@ tui/set - To set something for documentation write tui/set -Doc
        `;


    }else{
        result = `
$msg: Maybe the command is not added or maintenance
        `;
    }
    clientMsg.reply(result);

}
