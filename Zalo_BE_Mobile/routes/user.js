const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Route để cập nhật thông tin người dùng, yêu cầu xác thực
router.patch("/updateMe/:userId", authController.protect, userController.updateMe);

router.patch("/update-me", authController.protect ,userController.updateMe);
router.get("/getUser/:_id",authController.protect,  userController.getUser);

router.get("/get-users", authController.protect, userController.getUsers);
router.get("/get-friends", authController.protect, userController.getFriends);
router.get("/get-friend-requests", authController.protect, userController.getRequests);
router.get("/getAllUsers", userController.getAllUsers);

// Route để lấy thông tin hồ sơ của người dùng dựa trên truy vấn UID
router.get("/profile", userController.getProfile);


// http://localhost:3000/V1/users/update-me

module.exports = router;
