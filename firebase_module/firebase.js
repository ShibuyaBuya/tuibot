const database = require('./connect.js').database;
module.exports.read = (ref) => {
    const data = database.ref(ref).on('value').val();
    if (data == null) {
        return false;
    } else if (data == undefined) {
        return false;
    } else if (data == "") {
        return false;
    } else if (data != null || data != undefined || data != "") {
        return data;
    }
}
module.exports.write = (ref, data) => {
    database.ref(ref).set(data, (error) => {
        if (error) {
            return false;
        } else {
            return true;
        }
    });





}


function exists(ref) {
    var result;
    database.ref(ref).once('value', (snapshot) => {
        result = snapshot.exists();
        return;
    });
    return result;
}
module.exports.existsFirebase = function (ref) {
    var result;
    database.ref(ref).once('value', (snapshot) => {
        result = snapshot.exists();
        return;
    });
    return result;

}
module.exports.checkAccount = (number) => {
    var exs;
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        exs = snapshot.exists();
        return;
    });
    return exs;
}

module.exports.getUserData = (number) => {
    if (!exists('users_wa/' + number)) {
        return 404;
    }
    var data = "";
    database.ref('users_wa/' + number).on('value', (snapshot) => {
        data = snapshot.val();
        if (data == null) {
            return 0;
        } else if (data == undefined) {
            return 0;
        } else if (data == "") {
            return 0;
        } else if (data != null || data != undefined || data != "") {
            return data;
        }
    });
}


module.exports.register = (number, username) => {
    const dataregister = {
        user: username,

        coin: 0,
        role: -1
    }
    var result = "";


        if (exists('users_wa/' + number)) {
            result = "Account already exists";
            

        } else {
            database.ref('users_wa/' + number).set(
                dataregister);
            if (exists('users_wa/' + number) == false) {
                result = "Failed create account";
            } else if (exists('users_wa/' + number) == true) {
                result = `
hi ${username},
your account has been created.

if you want to see the list of commands, type *tui/menu* and if you have any questions, please contact the developer or type *tui/help*
                `;
            }


        }
       

    return result;
}
module.exports.roleParse = (role) => {
    var result = "";
    switch (role) {
        case -1:
            result = "User";
            break;
        case 0:
            result = "Moderator";
            break;
        case 1:
            result = "Administrator Account (AA)";
            break;
        case 2:
            result = "Database Administrator (DBA)";
            break;
        case 3:
            result = "System Administrator (SA)";
            break;
        case 4:
            result = "Tester";
            break;
        case 5:
            result = "Developer (DEV)";
            break;
        case 6:
            result = "CO-Founder";
            break;
        case 7:
            result = "Founder";
            break;
        case 8:
            result = "Registration Administrator (RA)";
            break;
        case 9:
            result = "Supervisor";
            break;
        case 10:
            result = "System Supervisor (SS)";
            break;
        case 11:
            result = "System Bot (SB)";
            break;
        case 12:
            result = "Account supervisor (AS)";
            break;
        case 13:
            result = "Account Bot (AB)";
            break;
        case 14:
            result = "Manager";
            break;
        case 15:
            result = "System Manager (SM)";
            break;
        case 16:
            result = "Bot Manager (BM)";
            break;
        case 17:
            result = "Promoter";
            break;
        case 18:
            result = "Database Manager (DBM)";
            break;
        case 19:
            result = "Data analyst (DA)";
            break;
        case 20:
            result = "Specialist Chinese/Japanese/Korean/English (CJK/E)";
            break;
        case 21:
            result = "My friend";
            break;
    }
    return result;
}
