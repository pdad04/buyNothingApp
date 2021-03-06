const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const router = express.Router();
const db = require("../../db");
const { body, validationResult } = require('express-validator');
require("dotenv").config();


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", 
  body("name", "Name is required").not().isEmpty(),
  body("email", "Valid Email is required").isEmail(),
  body("password","Password must be at least 6 characters").isLength({min: 6}),
  body("location", "Zip Code is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()});
    }

    const locationRes = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${req.body.location}&key=${process.env.GOOGLEMAP}`);
    const locationCoords = locationRes.data.results[0].geometry.location;
    const location = [locationCoords.lng, locationCoords.lat];

    const { name, email, password } = req.body
    
    // Check if input email already exists in DB.
    try {
     const existingEmail =  await db.getDb().db().collection("users").findOne({email});

     if(existingEmail) return res.status(400).json({errors: [{msg: "Email is already in use"}]})

    } catch (error) {
      res.status(500).json({msg: "Server Error"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    
    const newUser = {
      name: name,
      email: email,
      password: hashedPw,
      location: {
        type: "Point",
        coordinates: location
      }
    }

    // Save new user to DB and return jwt
    try {
      const savedUser = await db.getDb().db().collection("users").insertOne(newUser)
      const newUserId = savedUser.insertedId;

      // Prepare and sign JWT
      const payload = {
        _id: newUserId,
        name: newUser.name,
        location: newUser.location.coordinates
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        (error, token) => {
          if(error) throw(error) 
          res.json({ token })
        }
      )
    } catch (error) {
      res.status(500).json({ msg: error})
    }
});

router.post("/login", 
  body("email", "Email is required").not().isEmpty(),
  body("password", "Password is required").not().isEmpty(),
  async (req, res) => {
    try {
      const user = await db.getDb().db().collection("users").findOne({email: req.body.email});

      if(!user){
        return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
      }
      const correctPassword = await bcrypt.compare(req.body.password,user.password);

      if(!correctPassword){
        return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
      }

      const payload = {
        _id: user._id,
        name: user.name,
        location: user.location.coordinates
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        (error, token) => {
          if(error) throw(error) 
          res.json({ token })
        }
      )

    } catch (error) {
      res.status(500).send("Server Error")
    }
});

module.exports = router;