
const express = require("express");
let router = express.Router();


const expenses = [
  { Id: 1, Savings: { RRSP: 5000, Investments: 3000, Bonds: 1000, TreasuryBills: 500 }, PaymentObligations: { CreditCard: 4000, Loan: 8000, CarLease: 3500, LineOfCredit: 2000 }, Insurance: { LifeInsurance: 1200, MedicalInsurance: 1500, OtherInsurance: 800 }, Personal: { Transport: 2500, Clothing: 1200, Gym: 600, Gifts: 1000, PersonalGrooming: 700, EatingOut: 2200, Hobbies: 1500, Others: 3000 } },
  { Id: 2, Savings: { RRSP: 4000, Investments: 2500, Bonds: 800, TreasuryBills: 600 }, PaymentObligations: { CreditCard: 3000, Loan: 7000, CarLease: 2800, LineOfCredit: 1500 }, Insurance: { LifeInsurance: 1000, MedicalInsurance: 1300, OtherInsurance: 600 }, Personal: { Transport: 2000, Clothing: 900, Gym: 500, Gifts: 700, PersonalGrooming: 600, EatingOut: 1800, Hobbies: 1200, Others: 2500 } },
  { Id: 3, Savings: { RRSP: 6000, Investments: 4000, Bonds: 1200, TreasuryBills: 700 }, PaymentObligations: { CreditCard: 3500, Loan: 10000, CarLease: 3000, LineOfCredit: 2500 }, Insurance: { LifeInsurance: 1300, MedicalInsurance: 1400, OtherInsurance: 900 }, Personal: { Transport: 2600, Clothing: 1500, Gym: 800, Gifts: 1100, PersonalGrooming: 750, EatingOut: 2400, Hobbies: 1600, Others: 3200 } },
  { Id: 4, Savings: { RRSP: 3500, Investments: 2000, Bonds: 600, TreasuryBills: 400 }, PaymentObligations: { CreditCard: 2500, Loan: 6500, CarLease: 2700, LineOfCredit: 1800 }, Insurance: { LifeInsurance: 900, MedicalInsurance: 1200, OtherInsurance: 500 }, Personal: { Transport: 1900, Clothing: 800, Gym: 400, Gifts: 600, PersonalGrooming: 550, EatingOut: 1600, Hobbies: 1000, Others: 2000 } },
  { Id: 5, Savings: { RRSP: 7000, Investments: 5000, Bonds: 1500, TreasuryBills: 1000 }, PaymentObligations: { CreditCard: 4500, Loan: 9000, CarLease: 4000, LineOfCredit: 2800 }, Insurance: { LifeInsurance: 1600, MedicalInsurance: 1800, OtherInsurance: 1000 }, Personal: { Transport: 3000, Clothing: 1400, Gym: 700, Gifts: 1200, PersonalGrooming: 800, EatingOut: 2500, Hobbies: 1700, Others: 3500 } },
  { Id: 6, Savings: { RRSP: 3000, Investments: 1800, Bonds: 500, TreasuryBills: 300 }, PaymentObligations: { CreditCard: 2200, Loan: 5500, CarLease: 2400, LineOfCredit: 1200 }, Insurance: { LifeInsurance: 800, MedicalInsurance: 1100, OtherInsurance: 600 }, Personal: { Transport: 1800, Clothing: 700, Gym: 400, Gifts: 500, PersonalGrooming: 450, EatingOut: 1400, Hobbies: 900, Others: 2100 } },
  { Id: 7, Savings: { RRSP: 4000, Investments: 3000, Bonds: 900, TreasuryBills: 700 }, PaymentObligations: { CreditCard: 3200, Loan: 6700, CarLease: 2900, LineOfCredit: 1700 }, Insurance: { LifeInsurance: 1100, MedicalInsurance: 1400, OtherInsurance: 700 }, Personal: { Transport: 2200, Clothing: 1000, Gym: 600, Gifts: 800, PersonalGrooming: 700, EatingOut: 1900, Hobbies: 1300, Others: 2700 } },
  { Id: 8, Savings: { RRSP: 5000, Investments: 3200, Bonds: 1000, TreasuryBills: 800 }, PaymentObligations: { CreditCard: 3400, Loan: 7800, CarLease: 3100, LineOfCredit: 2000 }, Insurance: { LifeInsurance: 1300, MedicalInsurance: 1600, OtherInsurance: 900 }, Personal: { Transport: 2400, Clothing: 1100, Gym: 650, Gifts: 1000, PersonalGrooming: 750, EatingOut: 2100, Hobbies: 1400, Others: 2800 } },
  { Id: 9, Savings: { RRSP: 4500, Investments: 2800, Bonds: 950, TreasuryBills: 700 }, PaymentObligations: { CreditCard: 3000, Loan: 7200, CarLease: 2700, LineOfCredit: 1600 }, Insurance: { LifeInsurance: 1050, MedicalInsurance: 1350, OtherInsurance: 750 }, Personal: { Transport: 2100, Clothing: 850, Gym: 550, Gifts: 850, PersonalGrooming: 600, EatingOut: 1700, Hobbies: 1100, Others: 2600 } },
  { Id: 10, Savings: { RRSP: 3500, Investments: 2000, Bonds: 500, TreasuryBills: 300 }, PaymentObligations: { CreditCard: 2300, Loan: 5000, CarLease: 2600, LineOfCredit: 1300 }, Insurance: { LifeInsurance: 850, MedicalInsurance: 1100, OtherInsurance: 500 }, Personal: { Transport: 1800, Clothing: 750, Gym: 450, Gifts: 600, PersonalGrooming: 500, EatingOut: 1600, Hobbies: 900, Others: 2000 } }
];


//
router.get("/", (req, res)=>{
    res.json(expenses)
})

router.post("/", (req, res) => {
   
    const { Savings, PaymentObligations, Insurance, Personal } = req.body;

    if (!Savings || !PaymentObligations || !Insurance || !Personal ){
      return res.status(400).json({error: "all fields are required"})
    } 
   
    const newexpense = {
      id: expenses.length + 1,
      Savings, PaymentObligations, Insurance, Personal
    }
    expenses.push(newexpense)

    res.status(201).json({
      message: "User expense is created",
      expenses: newexpense

    })
})

// router.put("/", (req, res){
//     res.send("This is payroll");
// })

// router.delete("/", (req, res){
//     res.send("This is payroll");
// })



module.exports = router;