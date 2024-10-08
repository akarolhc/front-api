const express = require("express");
const AdviceApi = require("../api/advice");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", authMiddleware(), AdviceApi.findAdvices);
router.get("/:id", authMiddleware(), AdviceApi.findOneAdvice);
router.post("/", authMiddleware(["admin"]), AdviceApi.createAdvice);
router.put("/:id", authMiddleware(["admin"]), AdviceApi.updateAdvice);
router.delete("/:id", authMiddleware(["admin"]), AdviceApi.deleteAdvice); 


module.exports = router;
