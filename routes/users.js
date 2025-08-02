const express = require("express");
let router = express.Router();


const users = [
  { id: 1, name: "John Doe", username: "jdoe", email: "jdoe@example.com", address: { street: "123 Maple Street", apartment: "Apt 4B", city: "Toronto", zipcode: "M5V 2T6" }, birthDate: "1985-03-15", income: 85000, expenses: 45000 },
  { id: 2, name: "Sara Byekwaso", username: "sbyekwaso", email: "sara.b@example.com", address: { street: "456 Elm Street", apartment: "Unit 12", city: "Calgary", zipcode: "T2P 3N4" }, birthDate: "1990-07-26", income: 72000, expenses: 38000 },
  { id: 3, name: "Carlos Rivera", username: "crivera", email: "carlos.r@example.com", address: { street: "789 Oak Avenue", apartment: "Suite 9", city: "Montreal", zipcode: "H3B 1X8" }, birthDate: "1982-11-22", income: 92000, expenses: 50000 },
  { id: 4, name: "Fatima Noor", username: "fnoor", email: "fatima.noor@example.com", address: { street: "120 Birch Crescent", apartment: "Unit 7", city: "Ottawa", zipcode: "K1P 5G4" }, birthDate: "1993-02-18", income: 68000, expenses: 39000 },
  { id: 5, name: "Liam Chen", username: "liamc", email: "liam.c@example.com", address: { street: "78 King Street", apartment: "Suite 10", city: "Vancouver", zipcode: "V6B 3H7" }, birthDate: "1987-08-12", income: 99000, expenses: 60000 },
  { id: 6, name: "Aisha Malik", username: "amalik", email: "aisha.m@example.com", address: { street: "342 Cedar Lane", apartment: "Apt 2C", city: "Halifax", zipcode: "B3J 2X1" }, birthDate: "1995-06-05", income: 64000, expenses: 37000 },
  { id: 7, name: "Noah Smith", username: "nsmith", email: "noah.s@example.com", address: { street: "56 River Road", apartment: "Unit 6", city: "Winnipeg", zipcode: "R3C 4T3" }, birthDate: "1992-12-10", income: 77000, expenses: 41000 },
  { id: 8, name: "Emily Zhang", username: "ezhang", email: "emily.z@example.com", address: { street: "901 Sunset Blvd", apartment: "Apt 1A", city: "Edmonton", zipcode: "T5J 3N4" }, birthDate: "1991-05-21", income: 81000, expenses: 44000 },
  { id: 9, name: "David Kim", username: "dkim", email: "david.k@example.com", address: { street: "321 Queen Street", apartment: "Unit 5", city: "Regina", zipcode: "S4P 3N9" }, birthDate: "1989-10-09", income: 75000, expenses: 42000 },
  { id: 10, name: "Olivia Brown", username: "obrown", email: "olivia.b@example.com", address: { street: "12 Spruce Drive", apartment: "Apt 3F", city: "Saskatoon", zipcode: "S7K 2R7" }, birthDate: "1996-01-30", income: 69000, expenses: 36000 }
];

//
router.get("/", (req, res)=>{
    res.json(users)
})
//get names only
router.get("/names", (req, res) => {
  const names = users.map(user => user.name);
  res.json(names);
});

// get name plus id
router.get("/namesid", (req, res) => {
  const userNames = users.map(user => ({ id: user.id, name: user.name }));
  res.json(userNames);
});

router.post("/", (req, res) => {
   
    const { name, username, email, address, birthDate } = req.body;

    if (!name || !username || !email || !address || !birthDate ){
      return res.status(400).json({error: "all fields are required"})
    } 
   
    const newuser = {
      id: users.length + 1,
      name, username, email, address, birthDate
    }
    users.push(newuser)

    res.status(201).json({
      message: "User is created",
      users: newuser

    })
})

router.get("/names", (req, res) => {
  const names = users.map(user => user.name);
  res.json(names);
});
// router.put("/", (req, res){
//     res.send("This is payroll");
// })

// router.delete("/", (req, res){
//     res.send("This is payroll");
// })



module.exports = router;    