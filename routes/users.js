//-- users route)//

const express = require('express');
const route = express.Router();
const db = require('../firebase/firebase');
const usersRef = db.ref("/Users");



// Get all users
route.get('/', async (req, res) => {
  try {
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();
    res.json(users || {}); //return empty object if no users//
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// to find user by custom ID//
const findUserById = async (Id) => {
  const snapshot = await usersRef.orderByChild('id').equalTo(Id).once('value');
  const userData = snapshot.val();

  if (!userData) return `user-not-found`;

  const firebaseId = Object.keys(userData)[0];
  return {firebaseId, ...userData[firebaseId]
  };
};

// middleware to find user by custom ID
const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.userData = user;
    next(); //--to move to avoid hanging-//
  } catch (error) {
    res.status(500).json({ error: error.message }); // send error directly
  }
};

// Create NEW user--//
route.post('/', async (req, res) => {
  try {
    let newUser = req.body;

    if (!newUser.id || !newUser.name || !newUser.email || !newUser.username) {
      return res.status(400).json({ error: 'ID, Name, email, and username are required'});
    }

    const oldUser = await findUserById(newUser.id);
    if (oldUser) {
      return res.status(400).json({ error: 'User with this ID already exists' });
    }

    if (!newUser.address) {
      newUser.address = { street: '', apartment: '', city: '', zipcode: '' };
    }

    const userRef = usersRef.push();
    await userRef.set(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by custom ID
route.get('/id', getUserById, (req, res) => {
  res.json(req.userData);
});

// UpdATE user by custom ID
route.put('/id', getUserById, async (req, res) => {
  try {
    const updates = req.body;
    const { firebaseId } = req.userData;

    if (updates.address && req.userData.address) {
      updates.address = { ...req.userData.address, ...updates.address };
    }

    await usersRef.child(firebaseId).update(updates);

    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

// DDELETE user by custom ID--//////////////
route.delete('/id', getUserById, async (req, res) => {
  try {
    const { firebaseId } = req.userData;
    await usersRef.child(firebaseId).remove();

    res.json({
      message: 'User deleted successfully',
      ...req.userData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;