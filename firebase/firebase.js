const admin = require("firebase-admin");
const serviceAccount = require("./path-to-your-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://members-2ecef-default-rtdb.firebaseio.com"
});

const db = admin.database();
const membersRef = db.ref("Members");

module.exports = membersRef;
/////////////////////////////////////////////////

{
    id: 3,
    name: "Amina Yusuf",
    username: "ayusuf",
    email: "amina3@example.com",
    birthDate: "1988-07-19",
    address: { street: "78 Marlborough Rd", apartment: "8A", city: "Calgary", zipcode: "T3B 2E9" },
    income: { wages: 5100, secondaryIncome: 400, interest: 300, support: 0, otherSources: 100 },
    expenses: {
      savings: { RRSP: 6000, Investments: 4000, Bonds: 1200, TreasuryBills: 700 },
      paymentObligations: { creditCard: 450, loan: 350 },
      insurance: { lifeInsurance: 110, medicalInsurance: 130 },
      personal: { transport: 220, clothing: 160 }
    }
  },