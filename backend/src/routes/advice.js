const express = require("express");
const AdviceApi = require("../api/advice");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/all", authMiddleware(['admin']), AdviceApi.findAdvices);
router.get("/:id", authMiddleware(), AdviceApi.findById);
router.get("/",authMiddleware(), AdviceApi.findOne)
router.post("/", authMiddleware(), AdviceApi.createAdvice);
router.put("/:id", authMiddleware(), AdviceApi.updateAdvice);
router.delete("/:id", authMiddleware(["admin"]), AdviceApi.deleteAdvice); 


module.exports = router;
