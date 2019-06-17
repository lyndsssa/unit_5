const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');



router.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.status(200).json({
          status:200,
          message:'logged out'
        })
    })
});

router.post('/', (req, res)=>{
    User.findOne({username:req.body.username}, (err, foundUser)=>{
      if (foundUser) {
          if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.status(201).json({
              status:201,
              message:'created'
          })
          } else {
              res.status(401).json({
              status:401,
              message:'login failed'
          })}
      } else {
        res.status(401).json({
          status:401,
          message:'login failed'
      })}
})});


module.exports = router;
