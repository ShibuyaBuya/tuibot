//buat jika tidak memasukkan nomor nya maka otomatis login pakai nomor kontak nya, jika memasukkan nomor maka login pakai nomor yang dimasukkan
module.exports.PERMISSION = function (){
    return "LOGIN::23; LOGIN;";
}
module.exports.run = async (msg, client, cmsg) => {
    const firebase = require('../firebase_module/firebase.js');
    
    const contact = await cmsg.getContact();
    const number = contact.id._serialized.replace("@c.us", "");
    if (msg.length == 4){
        var numbers = msg[2].replace("@c.us", "");
        /*if (msg[2].endsWith("@c.us")){
            numbers = msg[2].replace("@c.us", "");
        }*/
        const logins = firebase.login(number, numbers, msg[3]);
        if (logins == 0){
            cmsg.reply("Login failed, try again later");
        }else if (logins == 1){
            cmsg.reply(`Login to ${number} success, now you logged in as ${msg[2]} if you want to switch account, use tui/switch/<number>`);
        }else if (logins == 404){
            cmsg.reply("Number not registered yet");
        }
    }else if (msg.length == 3){
        
        const logins = firebase.login(number, number, msg[2]);
        if (logins == 0){
            cmsg.reply("Login failed, try again later");
        }else if (logins == 1){
            cmsg.reply(`Login to ${number} success, now you logged in as ${msg[2]} if you want to switch account, use tui/switch/<number>`);
        }else if (logins == 404){
            cmsg.reply("Number not registered yet");
        }
    }else if (msg.length == 2){
        cmsg.reply("How to use: tui/login/<number>/<password>, but you can also use tui/login/<password> if you want to login with your own number");
    }
}