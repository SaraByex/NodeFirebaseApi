var admin = require("firebase-admin");

var serviceAccount = require("./newest.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://members-2ecef-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = db;
/////////////////////////////////////////////////

