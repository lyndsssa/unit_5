//==============
// DEPENDENCIES
//==============
const express = require('express');
const router = express.Router();
const Events = require('../models/events.js');
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');


//========
// INDEX
//========
router.get('/', (req, res) => {
  //Events.find({}, (error, foundUser) => {
    //res.json(foundUser);
    res.render('events.html');
  //});
  //res.send('opening search html')
})

//=======
// POST
//=======
router.post('/', (req, res) => {
  req.body.idForUser = req.session.currentUser._id
  Events.create(req.body, (err, createdEvent) => {
    res.json(createdEvent)
    console.log(createdEvent);
  });
});

//=========
// DELETE
//=========
router.delete('/:id', (req, res)=>{
    Events.findByIdAndRemove(req.params.id, (err, deletedEvent) => {
        res.json(deletedEvent);
    });
});

//=========
// UPDATE
//=========
router.put('/:id', (req, res)=>{
    Events.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedEvent)=>{
        res.json(updatedEvent);
    });
});

module.exports = router;
