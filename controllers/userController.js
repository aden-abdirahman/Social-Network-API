const { User } = require("../models");

const userControls = {
    // get all users
    findAllUsers(req, res) {
      User.find({})
        .select("-__v")
        .then((usersData) => res.json(usersData))
        .catch((err) => {console.log(err);res.sendStatus(400);});
    },

    // find a single user 
    findOneUser(req, res) {
        User.findOne({ _id: req.params.id })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .then((userData) => res.json(userData))
        .catch((err) => { console.log(err); res.sendStatus(400);});
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));

    },

    // updating a user by the id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
          .then((userData) => {
            if (!userData) {res.status(404).json({ message: "Can't find a user with this id" });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.json(err));
      },


    //  delete a user 
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
          .then((userData) => res.json(userData))
          .catch((err) => res.json(err));
      },

      // adding a friend by id
    addFriend(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
        )
        .then((userData) => {
            if (!userData) {res.status(404).json({ message: "Can't find anyone with this id" });
            return;
            }
            res.json(userData);
        })
    },

    // remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: {friends: req.params.friendId}},
            {new : true}
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
    }

}

module.exports = userControls;
