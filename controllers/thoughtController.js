const { User, Thought } = require("../models");

const thoughtControls = {
    // find all thoughts
    findThoughts(req, res) {
        Thought.find({})
          .then((foundThoughts) => res.json(foundThoughts))
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          });
      },

    //   find one single thought and populate reactions
    findOneThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((foundThought) => res.json(foundThought))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
  },    
    //  create a new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((data) => User.findOneAndUpdate({ _id: req.body.userId}, { $push: { thoughts: data._id } }, { new: true }))
    .then(newThought => res.json(newThought))
    .catch(err => res.status(400).json(err))
},

    //  updating thought using findOneAndUpdate
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Can't find a thought with this id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

    // delete a single thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thoughtData) => res.json(thoughtData))
          .catch((err) => res.json(err));
      },

    //   add a reaction to a thought
      addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: "Can't find a thought with this id" });
              return;
            }
            res.json(thought);
          })
    },
      // deleting a reaction
        removeReaction(req, res) {
            Thought.findOneAndUpdate(
             { _id: req.params.thoughtId },
             { $pull: { reactions: { reactionId: req.params.reactionId } } },
             { new: true }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
  },
};

module.exports = thoughtControls