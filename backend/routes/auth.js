const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router(); 


// Create a User using: POST "/api/auth/createUser". Doesn't require login 
router.post('/createUser ', [
    body('name','Please enter a valid name').isLength({ min: 3}),
    body('email', 'The email is invalid').isEmail(),
    body('password','Lol password').isLength({ min: 5 })
],async(req, res)=>{

  // if there is error return bad request

 const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
// check wheather the user exist with email exist already

let user =User.findOne({emial:req.body.email}) 
if(user){
  return res.status(400).json({error: "Sorry user with this email exist already "})
}
user= await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
//   .then(user => res.json(user))
//   .catch(err=>{console.log(err)
// res.json({error:"please enter a unique value you repeating the same value"})})

    
} )

module.exports = router;