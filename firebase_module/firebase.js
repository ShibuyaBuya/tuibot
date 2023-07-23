const database = require('./connect.js').database;
module.exports.read = (ref) => {
    const data = database.ref(ref).once('value').val();
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


async function exists(ref) {
    await database.ref(ref).once('value', (snapshot) => {

        return snapshot.exists();
    });
}
module.exports.checkAccount = (number) => {
    var exs = false;
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        exs = snapshot.exists();
    });
    return exs;
}

module.exports.getUserData = (number) => {
    if (!exists('users_wa/' + number)) {
        return 404;
    }
    var data = "";
    database.ref('users_wa/' + number).once('value', (snapshot) => {
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
        role: -1,
        status: 1
    }
    var result = "";
    if (exists('users_wa/' + number)) {
        result = "Account already exists";
    }
    database.ref('users_wa/' + number).set(
        dataregister, (error) => {
            if (error) {
                result = "Failed create account";
            } else {
                result = `
                hi ${username}, your account has been created,
                if you want to see the list of commands, type *tui/commands* and if you have any questions, please contact the developer or type *tui/help*
                `;
            }
        }
    );
    return result;
}

