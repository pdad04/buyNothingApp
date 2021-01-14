const express = require("express");
const router = express.Router();
const db = require("../../db");
const fs = require("fs");
const auth = require("../../middleware/auth");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { check, body, validationResult } = require("express-validator");
const { ObjectID } = require("mongodb");

const upload = multer({ dest: "uploads", preservePath: true});

// @route   POST api/posts/create
// @desc    Create a post
// @access  Private
router.post("/create",
  [auth,
   upload.single("photo"),
  [body("title", "Title is required").not().isEmpty(),
   body("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
    }

    try {
     const newPost = {
       user: req.user,
       title: req.body.title,
       text: req.body.text,
     }

     if(req.file){
       const photoUpload = await cloudinary.uploader.upload(req.file.path);
       newPost.photo = { url: photoUpload.url, public_id: photoUpload.public_id }
       fs.unlinkSync(req.file.path);
     }

     await db.getDb().db().collection("posts").insertOne(newPost);
     console.log(newPost);
     res.status(200).json(newPost);

    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
});

// @route   PUT api/posts/update/:post
// @desc    Update a users post
// @access  Private
router.put("/update/:post",
  [auth,
   upload.single("photo"),
  [body("title", "Title is required").not().isEmpty(),
   body("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ errors: errors.array()})
    }

    // Get the creator of the post to confirm it can be updated by the current user
    const postCreator = await db.getDb().db().collection("posts").findOne({_id: new ObjectID(req.params.post)}, {projection: {user: 1, _id:0}})
  
    if(postCreator.user !== req.user){
      return res.status(401).json({ message: "Only the post creator can update the post"})
    }

    try {
     const updatedPost = {
       user: req.user,
       title: req.body.title,
       text: req.body.text,
     }

      if(req.file){
        const photoUpload = await cloudinary.uploader.upload(req.file.path);
        updatedPost.photo = { url: photoUpload.url, public_id: photoUpload.public_id }
        fs.unlinkSync(req.file.path);
      }

     await db.getDb().db().collection("posts").replaceOne({_id: new ObjectID(req.params.post)}, updatedPost);
     res.status(200).json(updatedPost);

    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
});


// @route   DELETE api/posts/delete/:post
// @desc    Update a users post
// @access  Private
router.delete("/delete/:post", auth, async (req, res) => {
    try {
      // Get the creator of the post to confirm it can be deleted by the current user
      const postCreator = await db.getDb().db().collection("posts").findOne({_id: new ObjectID(req.params.post)}, {projection: {user: 1, photo: 1, _id:0}})

      if(postCreator.user !== req.user){
        return res.status(401).json({ message: "Only the post creator can delete the post"})
      }

      if(postCreator.photo){
        await cloudinary.uploader.destroy(postCreator.photo.public_id);
      }
      
      await db.getDb().db().collection("posts").deleteOne({_id: new ObjectID(req.params.post)});

      res.status(200).json({ message: "Post sucessfully deleted"});

    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
});

// @route   POST api/posts/
// @desc    Get Posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const allPosts = [];
    const posts = await db.getDb().db().collection("posts").find({});
    await posts.forEach(post => {
      allPosts.push(post);
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;