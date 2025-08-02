
// const expenses = [
//  { Id: 6, Savings: { RRSP: 3000, Investments: 1800, Bonds: 500, TreasuryBills: 300 }, PaymentObligations: { CreditCard: 2200, Loan: 5500, CarLease: 2400, LineOfCredit: 1200 }, Insurance: { LifeInsurance: 800, MedicalInsurance: 1100, OtherInsurance: 600 }, Personal: { Transport: 1800, Clothing: 700, Gym: 400, Gifts: 500, PersonalGrooming: 450, EatingOut: 1400, Hobbies: 900, Others: 2100 } },
//   { Id: 7, Savings: { RRSP: 4000, Investments: 3000, Bonds: 900, TreasuryBills: 700 }, PaymentObligations: { CreditCard: 3200, Loan: 6700, CarLease: 2900, LineOfCredit: 1700 }, Insurance: { LifeInsurance: 1100, MedicalInsurance: 1400, OtherInsurance: 700 }, Personal: { Transport: 2200, Clothing: 1000, Gym: 600, Gifts: 800, PersonalGrooming: 700, EatingOut: 1900, Hobbies: 1300, Others: 2700 } },
//   { Id: 8, Savings: { RRSP: 5000, Investments: 3200, Bonds: 1000, TreasuryBills: 800 }, PaymentObligations: { CreditCard: 3400, Loan: 7800, CarLease: 3100, LineOfCredit: 2000 }, Insurance: { LifeInsurance: 1300, MedicalInsurance: 1600, OtherInsurance: 900 }, Personal: { Transport: 2400, Clothing: 1100, Gym: 650, Gifts: 1000, PersonalGrooming: 750, EatingOut: 2100, Hobbies: 1400, Others: 2800 } },
//   { Id: 9, Savings: { RRSP: 4500, Investments: 2800, Bonds: 950, TreasuryBills: 700 }, PaymentObligations: { CreditCard: 3000, Loan: 7200, CarLease: 2700, LineOfCredit: 1600 }, Insurance: { LifeInsurance: 1050, MedicalInsurance: 1350, OtherInsurance: 750 }, Personal: { Transport: 2100, Clothing: 850, Gym: 550, Gifts: 850, PersonalGrooming: 600, EatingOut: 1700, Hobbies: 1100, Others: 2600 } },
//   { Id: 10, Savings: { RRSP: 3500, Investments: 2000, Bonds: 500, TreasuryBills: 300 }, PaymentObligations: { CreditCard: 2300, Loan: 5000, CarLease: 2600, LineOfCredit: 1300 }, Insurance: { LifeInsurance: 850, MedicalInsurance: 1100, OtherInsurance: 500 }, Personal: { Transport: 1800, Clothing: 750, Gym: 450, Gifts: 600, PersonalGrooming: 500, EatingOut: 1600, Hobbies: 900, Others: 2000 } }
// ];

const express = require("express");
const route = express.Router();  

const db = require("../firebase/firebase"); 
const expensesRef = db.ref("/Expenses");  




// GET ALLexpenses ////////////
route.get("/", async (req, res) => {
  try {
    const snapshot = await expensesRef.once("value");
    const data = snapshot.val() || {};
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new expense entry ---/////////////////
route.post("/", async (req, res) => {
  const {Id, Savings, PaymentObligations, Insurance, Personal} = req.body;

  if (!Id || !Savings || !PaymentObligations || !Insurance || !Personal) {
    return res.status(400).json({ error: "All DATA is required"});
  }

  const newExpense = {Id, Savings, PaymentObligations, Insurance, Personal};

  try {
    const newRef = expensesRef.push();
    await newRef.set(newExpense);
    res.status(201).json({message: "Expense added"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET expense by custom Id (manual search inside object)
route.get("/find/:id", async (req, res) => {
  const customId = parseInt(req.params.id);

  try {
    const snapshot = await expensesRef.once("value");
    const data = snapshot.val() || {};

    const foundEntry = Object.entries(data).find(
      ([firebaseId, entry]) => entry.Id === customId );

    if (!foundEntry) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const [firebaseId, expenseData] = foundEntry;
    res.json({ firebaseId, ...expenseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update expense by Firebase ID
route.put("/:firebaseId", async (req, res) => {
  const updateRef = expensesRef.child(req.params.firebaseId);

  try {
    await updateRef.update(req.body);
    res.json({ message: "Expense updated", id: req.params.firebaseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE expense by Firebase ID
route.delete("/:firebaseId", async (req, res) => {
  const deleteRef = expensesRef.child(req.params.firebaseId);

  try {
    await deleteRef.remove();
    res.json({ message: "Expense deleted", id: req.params.firebaseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;