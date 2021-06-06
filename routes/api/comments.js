const express = require("express");
const router = express.Router();
const db = require("../../db");
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const { ObjectID } = require("mongodb");

// @route   POST api/comments/:postId/create
// @desc    Create a comment on a post
// @access  Private
router.post("/:postId/create", auth, body("text", "Comment text is required").not().isEmpty(), async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  const newComment = {
    _id: ObjectID(),
    userId: req.user,
    text: req.body.text,
    createdAt: new Date()
  }

  try {
    const comment = await db.getDb().db().collection("posts").updateOne({_id: new ObjectID(req.params.postId)}, {$addToSet: {comments: newComment}});
    
    // If there is no post with :postId return 404
    if(!comment.matchedCount){
     return res.status(404).json({ message: "Post does not exist"})
    }

    res.status(200).json(newComment);
    
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   PATCH api/comments/:commentId/update
// @desc    Update a comment on post
// @access  Private
router.patch("/:commentId/update", auth, body("text", "Comment text is required").not().isEmpty(), async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  // Get the post the comment is embedded on
  const post = await db.getDb().db().collection("posts").findOne({"comments._id": new ObjectID(req.params.commentId)}, {comments: { $elemMatch: { _id: new ObjectID(req.params.commentId) }}});
  
  if(!post) {
    return res.status(404).json({ message: "Post does not exist"})
  }
  
  if(req.user !== post.comments[0].userId){
    return res.status(401).json({message: "Only the comment creator can update the comment"});
  }

  try {
    const updated = await db.getDb().db().collection("posts").findOneAndUpdate({ "comments._id": new ObjectID(req.params.commentId) }, { $set: {"comments.$.text": req.body.text, "comments.$.createdAt": new Date()}}, {returnOriginal: false} );

    res.status(200).json(updated);
    
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/comments/:commentId/remove
// @desc    Delete a comment
// @access Private
router.delete("/:commentId/remove", auth, async (req, res) => {
  try {
    const post = await db.getDb().db().collection("posts").aggregate([
      {
        '$unwind': {
          'path': '$comments', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          'comments._id': new ObjectID(`${req.params.commentId}`)
        }
      }
    ]).toArray();
    
    if(req.user !== post[0].comments.userId){
      return res.status(401).json({errors: [{msg: "Only the comment creator can delete the comment"}]});     
    }

    await db.getDb().db().collection("posts").updateOne({ "comments._id": new ObjectID(req.params.commentId)}, { $pull: { comments : { _id: new ObjectID(req.params.commentId)}}});
    
    res.status(204).send()

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;