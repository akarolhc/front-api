const express = require("express");
const UserAdviceApi = require("../api/user_advice");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware(), UserAdviceApi.createUserAdvice);
router.get("/", authMiddleware(), UserAdviceApi.findAdvicesByUserId);
router.delete("/:id", authMiddleware(), UserAdviceApi.deleteUserAdvice);

module.exports = router;