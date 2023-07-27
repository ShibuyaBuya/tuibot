const firebase_module = require('../firebase_module/firebase.js');
const database = require('../firebase_module/connect.js').database;
function idTransactionMakerHex(){
    var idTransaction;
    const timestampNow = Date.now();
    const timestampHex = timestampNow.toString(16);
    const randomHex = Math.floor(Math.random() * 10000000000000000).toString(16);
    idTransaction = timestampHex + randomHex;
    return idTransaction;
}
function objectTransaction({type: int, names: string, sender: string, receiver: string, amount: int, coin: int}){
    const idTransaction = idTransactionMakerHex();
    const timestampNow = Date.now();
    let coin_after;
    switch (type){
        case 0:
            coin_after = coin + amount;
            break;
        case 1:
            coin_after = coin - amount;
            break;
        case 2:
            coin_after = coin * amount;
            break;
        case 3:
            coin_after = coin / amount;
            break;
    }
    
    const transaction = {
         id: idTransaction,
         type: type,
         name: names,
         sender: sender,
         receiver: receiver,
         amount: amount,
         coin: coin,
         coin_after: coin_after,
         timestamp: timestampNow,
         status: {
            key: idTransaction,
            verify: false,
            verify_by: ""
         }
    }
    return transaction;
}
module.exports.transactionMaker = async function ({type: int, names: string, sender: string, receiver: string, amount: int, coin: int}) {
    const transactionObject = objectTransaction({type: type, names: names, sender: sender, receiver: receiver, amount: amount, coin: coin});
    const transaction = await database.ref('transaction/' + transactionObject.id).set(transactionObject);
    
}
module.exports.transactionVerify = async function (idTransaction, verify_by){
    var res;
    database.ref('transaction/' + idTransaction).once('value', (snapshot) => {
        if (transaction.exists()) {
            const transactionObject = transaction.val();
            if (transactionObject.status.verify == false) {
                transactionObject.status.verify = true;
                transactionObject.status.verify_by = verify_by;
                database.ref('transaction/' + idTransaction).set(transactionObject);
                res = {
                    code: 200,
                    result: "Transaction with id ```" + idTransaction + "``` has been verified by " + verify_by + "!"
                }
            }
            else {
                res ={
                    code: 400,
                    result: "Transaction already verified!"
                }
            }
        }
        else {
            res = {
                code: 404,
                result: "Transaction doesn't exist!"
            }
        }
    });
   return res;
}
