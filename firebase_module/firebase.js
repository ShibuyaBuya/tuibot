const database = require('./connect.js').database;
module.exports.read = (ref) => {
    const data = database.ref(ref).once('value').val();
    if (data == null){
        return false;
    }else if (data == undefined){
        return false;
    }else if (data == ""){
        return false;
    }else if (data != null || data != undefined || data != ""){
        return data;
    }
}
module.exports.write = (ref, data) => {
    database.ref(ref).set(data);
    const writeSuccess = database.ref(ref).once('value').val();
    if (writeSuccess == data){
        return true;
    }else{
        return false;
    }
}