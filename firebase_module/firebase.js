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
module.exports.login = (number, numberLogin, password) => {
    const data = database.ref('users_wa/' + number).once('value').val();
    if (data == null) {
        return false;
    } else if (data == undefined) {
        return false;
    } else if (data == "") {
        return false;
    } else if (data != null || data != undefined || data != "") {
        if (password == data.password) {
            const ws = writeSession(number, numberLogin, password);
            if (ws == 0) {
                return 0;
            }else if (ws == 2){
                return "Session already exists or you already logged in";
            }
            return true;
        } else {
            return false;
        }
    }
}
module.exports.register = (number, password) => {
    const dataregister = {
        password: password,
        
        coin: 0,
        role: -1,
        status: 1
    }
    if (database.exists('users_wa/' + number)) {
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
                }else if (ws == 2){
                    return "Session already exists";
                }
                return true;
            }
        }
    );
    

}
module.exports.writeSession = (number, numberSession, password) => {

    const session = {
        session: { //mau ubah ke nomor
            session_status: {
                expired: false





            },
            session_data: {
                number: number,
                password: password

            }
        }
    }
    if (database.exists('users_wa/' + number + '/session/' + numberSession)) {
        return 2;
    }
    database.ref('users_wa/'+number+'/session/'+numberSession).set(session, (error) => {
        if (error) {
            return 0;
        } else {
            return 1;
        }
    });
}
