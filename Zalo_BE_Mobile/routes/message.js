const router = require("express").Router();
const messagesController = require("../controllers/messagesController");
const multer = require("../middleware/GetImgMiddleware");

router.post("/upload-file", multer.Multer.single('file') , messagesController.uploadFile);

module.exports = router;