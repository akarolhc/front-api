const express = require('express'); 

const Advice = require('../models/advice');
const { update } = require('../model/advice');
const AdviceApi = require('../api/advice');
const router = express.Router();

router.put("/:id", AdviceApi.updateAdvice)
router.get("/", AdviceApi.findDevice);
router.delete("/:id", AdviceApi.deleteDevice);

module.exports = router;