const router = require("express").Router();

// importing user handling functions from user-controller
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// route for finding all users and creating them
router.route("/").get(findAllUsers).post(createUser);

// route for finding a single user and deleting them
router.route("/:id").get(findOneUser)
.put(updateUser).delete(deleteUser);

// route for finding a friend by id
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router; 