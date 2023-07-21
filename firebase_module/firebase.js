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
async function writeSession(number, numberSession, password, default_session = false) {

    const session = {

        session_status: {
            expired: false





        },
        session_data: {
            number: number,
            password: password

        }

    }
    if (exists('users_wa/' + number + '/session/' + numberSession)) {
        return 2;
    }
    if (default_session) {
        if (exists('users_wa/' + number + '/session/default')) {
            await database.ref('users_wa/'+number+'/session/default').once('value', (snapshot) => {
                const data = snapshot.val();
                if (data.session_data.number == numberSession){
                    return 2;
                }
            });
            
        }

        await database.ref('users_wa/' + number + '/session/default').set(session);
        await database.ref('users_wa/' + number + '/session/default').once('value', (snapshot) => {
            const check = snapshot.val();
            if (check == null) {
                return 0;
            } else if (check == undefined) {
                return 0;
            } else if (check == "") {
                return 0;
            } else if (check != null || check != undefined || check != "") {
                return 1;
            }
        });
    }
    if (exists('users_wa/' + number + '/session/' + numberSession)) {
        return 2;
    }
    await database.ref('users_wa/' + number + '/session/' + numberSession).set(session);
    await database.ref('users_wa/' + number + '/session/' + numberSession).once('value', (snapshot) => {
        const check = snapshot.val();
        if (check == null) {
            return 0;
        } else if (check == undefined) {
            return 0;
        } else if (check == "") {
            return 0;
        } else if (check != null || check != undefined || check != "") {
            return 1;
        }
    });

}

async function exists(ref) {
    await database.ref(ref).once('value', (snapshot) => {

        return snapshot.exists();
    });
}
module.exports.checkAccount = async (number) => {



    await database.ref('users_wa/' + number).once('value', (snapshot) => {
        const exs = snapshot.exists();
        console.log(exs);
        return snapshot.exists();
    });
}
module.exports.checkLoginState = (number) => {
    if (!exists('users_wa/' + number + '/session/default')) {
        return 404;
    }
    database.ref('users_wa/' + number + '/session/default').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
            return 0;
        } else if (data == undefined) {
            return 0;
        } else if (data == "") {
            return 0;
        } else if (data != null || data != undefined || data != "") {
            return 1;
        }
    });
}
module.exports.getUserData = (number, session) => {
    if (!exists('users_wa/' + number + '/session/' + session)) {
        return 404;
    }
    database.ref('users_wa/' + session.session_data.number).once('value', (snapshot) => {
        const data = snapshot.val();
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
module.exports.getSessionDefault = (number) => {
    if (!exists('users_wa/' + number + '/session/default')) {
        return 404;
    }
    database.ref('users_wa/' + number + '/session/default').once('value', (snapshot) => {
        const data = snapshot.val();
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
module.exports.switch = (number, numberSession) => {
    if (!exists('users_wa/' + number + '/session/' + numberSession)) {
        return 404;
    }
    database.ref('users_wa/' + number + '/session/' + numberSession).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
            return 0;
        } else if (data == undefined) {
            return 0;
        } else if (data == "") {
            return 0;
        } else if (data != null || data != undefined || data != "") {
            const ws = writeSession(number, number, data.session.session_data.password, default_session = true);
            if (ws == 0) {
                return 0;
            } else if (ws == 2) {
                return "Session already exists or you already logged in";
            }
            return 1;
        }
    });
}
module.exports.login = (number, numberLogin, password) => {
    if (!exists('users_wa/' + number)) {
        return 404;
    }
    database.ref('users_wa/' + number).once('value', (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
            return 0;
        } else if (data == undefined) {
            return 0;
        } else if (data == "") {
            return 0;
        } else if (data != null || data != undefined || data != "") {
            if (password == data.password) {
                const ws = writeSession(number, numberLogin, password, default_session = true);
                if (ws == 0) {
                    return 0;
                } else if (ws == 2) {
                    return "Session already exists or you already logged in";
                }
                return 1;
            } else {
                return 0;
            }
        }
    });
}
module.exports.register = (number, password) => {
    const dataregister = {
        password: password,

        coin: 0,
        role: -1,
        status: 1
    }
    if (exists('users_wa/' + number)) {
        return "Account already exists";
    }
    database.ref('users_wa/' + number).set(
        dataregister, (error) => {
            if (error) {
                return 0;
            } else {
                const ws = writeSession(number, number, password);
                if (ws == 0) {
                    return 0;
                } else if (ws == 2) {
                    return "Session already exists";
                }
                return 1;
            }
        }
    );


}

