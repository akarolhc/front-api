const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const UserApi = require("../api/user");

router.get("/info", authMiddleware(), UserApi.findOneUser); 
router.post("/", UserApi.createUser);
router.put("/", authMiddleware(), UserApi.updateUser); 
router.delete("/:id", authMiddleware(), UserApi.deleteUser);

router.get("/find", authMiddleware(["admin"]), UserApi.findUsers); 
router.post("/admin", authMiddleware(["admin"]), UserApi.createUserAdmin);
router.put("/admin/:id", authMiddleware(["admin"]), UserApi.updateUser);
router.delete("/admin/:id", authMiddleware(["admin"]), UserApi.deleteUser);

module.exports = router;
