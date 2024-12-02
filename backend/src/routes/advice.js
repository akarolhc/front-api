const express = require("express");
const AdviceApi = require("../api/advice");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/all", authMiddleware(['admin']), AdviceApi.findAdvices);
router.get("/",authMiddleware(), AdviceApi.findOne)
router.post("/", authMiddleware(["admin"]), AdviceApi.createAdvice);
router.put("/:id", authMiddleware(["admin"]), AdviceApi.updateAdvice);
router.delete("/:id", authMiddleware(["admin"]), AdviceApi.deleteAdvice); 
router.get("/alimentar", authMiddleware(["admin"]), AdviceApi.alimentarConselhos)
router.get("/:id", authMiddleware(), AdviceApi.findById);


module.exports = router;
