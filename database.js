const admin = require("firebase-admin");

// importera den private nyckeln
// den används för att logga in på ditt fb-konto
let serviceAccount;

if( process.env.PRIVATE_KEY ) {

	serviceAccount = JSON.parse(process.env.PRIVATE_KEY)

} else {
	
	serviceAccount = require ("./firebase-key.json");

}

//console.log ('service account', serviceAccount)

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