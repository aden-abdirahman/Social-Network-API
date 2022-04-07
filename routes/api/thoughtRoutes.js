const router = require('express').Router();
// importing thought handling functions
const {
  findThoughts,
  findOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');


// finding all thoughts: endpoint = api/thoughts
router.route('/').post(createThought).get(findThoughts);

// routes for finding updating and deleting a thought
router
  .route('/:thoughtId')
  .get(findOneThought)
  .put(updateThought)
  .delete(deleteThought);

//   route handler for adding reactions
  router.route("/:thoughtId/reactions").post(addReaction);
// route handler for removing reactions
  router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);


module.exports = router;