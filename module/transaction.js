// buat transaksi untuk mencatat jejak transaksi, topup, game, dll dengan id transaksi khusus dan jika transaksi valid atau berhasil di proses maka coin atau transaksi berjalan/ selesai dengan return true
const database = require('../firebase_module/connect.js').database;
//const transaction = require('../transaction/transaction.js');
const firebase_module = require('../firebase_module/firebase.js');
module.exports.run = async (msg, client, cmsg) => {
    cmsg.reply("Coming soon!");
}