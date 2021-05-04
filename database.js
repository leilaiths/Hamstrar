const admin = require("firebase-admin");

// importera den private nyckeln
// den används för att logga in på ditt fb-konto
const serviceAccount = require("./firebase-key.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()

// Hämta databasen 
function getDatabase() {
	return admin.firestore();
}

//exportera databasen
module.exports = getDatabase