const express = require("express");
const AdviceApi = require("../api/advice");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", AdviceApi.findAdvices);
// router.get("/:id", authMiddleware(), AdviceApi.findAdvice);
router.post("/", authMiddleware(["admin"]), AdviceApi.createAdvice);
router.put("/:id", authMiddleware(["admin"]), AdviceApi.updateAdvice);
router.delete("/:id", authMiddleware(["admin"]), AdviceApi.deleteAdvice); 


//router.put("/:id", AdviceApi.updateAdvice)
//router.get("/", AdviceApi.findDevice);
//router.delete("/:id", AdviceApi.deleteDevice)/;

module.exports = router;
