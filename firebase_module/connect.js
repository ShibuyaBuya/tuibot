const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const fs = require('fs');
const configuration = require('../configuration.json');
const db = configuration.dburl;
const ref = configuration.reference;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: db
});
module.exports.database = admin.database();

