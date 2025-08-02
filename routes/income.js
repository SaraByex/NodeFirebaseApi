const express = require("express");
let router = express.Router();



const income = [
  { id: 1, wages: 4800 , secondary: 600, interest: 200, support: 200, other: 200 },
  { id: 2, wages: 4500, secondary: 500, interest: 100, support: 100, other: 100 },
  { id: 3, wages: 5100, secondary: 400, interest: 300, support: 0, other: 100 },
  { id: 4, wages: 4200, secondary: 300, interest: 100, support: 50, other: 50 },
  { id: 5, wages: 5400, secondary: 700, interest: 150, support: 200, other: 150 },
  { id: 6, wages: 4000, secondary: 300, interest: 100, support: 50, other: 50 },
  { id: 7, wages: 4600, secondary: 500, interest: 150, support: 0, other: 150 },
  { id: 8, wages: 4900, secondary: 600, interest: 150, support: 100, other: 100 },
  { id: 9, wages: 4700, secondary: 400, interest: 100, support: 100, other: 100 },
  { id: 10, wages: 4300, secondary: 350, interest: 120, support: 80, other: 50 }
];

//
router.get("/", (req, res)=>{
    res.json(income)
})

router.post("/", (req, res) => {
   
    const { wages, secondary, interest, support, other } = req.body;

    if (!wages || !secondary || !interest || !support || !other){
      return res.status(400).json({error: "all fields are required"})
    } 
   
    const newincome = {
      id: income.length + 1,
      wages, secondary, interest, support, other
    }
    income.push(newincome)

    res.status(201).json({
      message: "User income is created",
      income: newincome

    })
})

// router.put("/", (req, res){
//     res.send("This is payroll");
// })

// router.delete("/", (req, res){
//     res.send("This is payroll");
// })



module.exports = router;

