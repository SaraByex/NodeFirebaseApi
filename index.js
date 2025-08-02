const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require('./firebase/firebase.js');
const incomeRoutes = require("./routes/income.js");
const expensesRoutes = require("./routes/expenses.js");
const usersRoutes = require("./routes/users.js");
const port = 3000;

const cors = require("cors");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

app.use(cors());
app.use("/income", incomeRoutes);
app.use("/expenses", expensesRoutes);
app.use("/users", usersRoutes);





app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});
