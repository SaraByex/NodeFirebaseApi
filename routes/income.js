const express = require('express');
const route = express.Router();
const db = require('../firebase/firebase');
const incomeRef = db.ref("/Income");


// const income = [
//   { id: 1, wages: 4800 , secondary: 600, interest: 200, support: 200, other: 200 },
//   { id: 2, wages: 4500, secondary: 500, interest: 100, support: 100, other: 100 },];///


// GET all income entries - return as object///
route.get("/", async (req, res) => {
  try {
    const snapshot = await incomeRef.once("value");
    const data = snapshot.val() || {};  // returns empty if none --c//

    res.json(data);  // send the object directly
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new income entry with custom id//
route.post("/", async (req, res) => {
  const {id, wages, secondary, interest, support, other} = req.body;

  if (!id || !wages || !secondary || !interest || !support || !other) {
    return res.status(400).json({error: "All fields including 'id' are required"});
  }

  const newIncome = {id, wages, secondary, interest, support, other};

  try {
    const newRef = incomeRef.push();
    await newRef.set(newIncome);
    res.status(201).json({ message: "Income added"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET income by custom id (manual filter)//
route.get('/find/:id', async (req, res) => {
  const customId = parseInt(req.params.id);

  try {
    const snapshot = await incomeRef.once('value');
    const data = snapshot.val() || {};

    // Manual search by custom id inside the object
    const foundEntry = Object.entries(data).find(
      ([firebaseId, entry]) => entry.id === customId
    );

    if (!foundEntry) {
      return res.status(404).json({ error: "Income not found with given ID" });
    }

    const [firebaseId, incomeData] = foundEntry;
    res.json({ firebaseId, incomeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update income by Firebase ID /////////////
route.put('/:firebaseId', async (req, res) => {
  const updateRef = incomeRef.child(req.params.firebaseId);

  try {
    await updateRef.update(req.body);
    res.json({ message: "Income updated", id: req.params.firebaseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE income by Firebase ID
route.delete('/:firebaseId', async (req, res) => {
  const deleteRef = incomeRef.child(req.params.firebaseId);

  try {
    await deleteRef.remove();
    res.json({ message: "Income deleted", id: req.params.firebaseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;
