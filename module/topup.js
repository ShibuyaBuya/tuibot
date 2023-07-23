
module.exports.run = async (msg, client, cmsg) => {
    const firebase_module = require('../firebase_module/firebase.js');
    const database = require('../firebase_module/connect.js').database;
    const contact = await cmsg.getContact();
    const permission = require('../permission.json');
    const number = contact.id._serialized.replace("@c.us", "");
    if (msg.length < 3) {
        cmsg.reply("Usage: !topup/<amoint>/<number> (optional)");
        return;
    }
    
    if (isNaN(msg[2]) || msg[2] == "Infinity" || msg[2] == "-Infinity") {
        cmsg.reply("Please specify the amount of topup");
        return;
    }
    var snap;
    var exs;
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        //exs = snapshot.exists();
        snap = snapshot.val();
        if (snap.role in permission.topup) {
            let coin = msg[2];
            if (msg.length >= 4) {
                var num = parsePhoneNumber(msg[3]).replace(" ", "");
                /*const rep = ["+"," ","-","@c.us"];
                for (var i in rep){
                    num = num.replace(i, "");
                }*/
                console.log(num);
                if (isNaN(num)) {
                    cmsg.reply("Please specify the number of user");
                    return;
                }
                database.ref('users_wa/' + num).once('value', (snapshot) => {
                    ex = snapshot.exists();
                    data = snapshot.val();
                    if (ex) {
                        let coin = parseInt(msg[2], 10);
                        if (coin <= 0){
                            cmsg.reply("Please specify the amount of topup");
                            return;

                        }
                        console.log(coin);
                        let datc = parseInt(data.coin, 10);
                        let coinNow = datc + coin;
                        database.ref('users_wa/' + num).update({ coin: coinNow });
    
                        client.sendMessage(num+"@c.us", "Successfully topup $ "+coin+"\nThanks good people!");
                        cmsg.reply("Topup success");
                        return;
                    } else {
                        cmsg.reply("User not found");
                        return;
    
                    }
    
                });
                return;
            } else if (msg.length == 3) {
                var ex;
                var data;
                database.ref('users_wa/' + number).once('value', (snapshot) => {
                    ex = snapshot.exists();
                    data = snapshot.val();
                    if (ex) {
                        let coin = parseInt(msg[2], 10);
                        if (coin <= 0){
                            cmsg.reply("Please specify the amount of topup");
                            return;

                        }
                        console.log(coin);
                        let datc = parseInt(data.coin, 10);
                        let coinNow = datc + coin;
                        console.log(coinNow);
                        database.ref('users_wa/' + number).update({ coin: coinNow });
    
                         client.sendMessage(number+"@c.us", "Successfully topup $ "+coin+"\nThanks good people!");
                        cmsg.reply("Topup success");
                        return;
                    } else {
                        cmsg.reply("User not found");
                        return;
    
                    }
    
    
    
    
    
                });
                
            }
        }else{
            cmsg.reply("You don't have permission to use this command");
            return;
        }

        
    });
    /*if (!exs) {
        cmsg.reply("You're not registered yet");
        return;
    }*/


}
function parsePhoneNumber(string){
    var result = "";
    for (var i in string){
        if (!isNaN(string[i])){
            result += string[i]
        }
    }
    return result;
}
function convertStringToInt(string) {
    let result = 0;
    for (let i = 0; i < string.length; i++) {
        result += string.charCodeAt(i);
    }
    return result;
}