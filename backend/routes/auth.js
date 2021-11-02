const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router(); 


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', [
    body('name','Please enter a valid name').isLength({ min: 3}),
    body('email', 'The email is invalid').isEmail(),
    body('password','Lol password').isLength({ min: 5 })
],(req, res)=> {
 const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => res.json(user))
  .catch(err=>{console.log(err)
res.json({error:"please enter a unique value you repeating the same value"})})

    
} )

module.exports = router