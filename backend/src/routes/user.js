const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const UserApi = require("../api/user");

router.post("/", UserApi.createUser);
router.put("/", authMiddleware(), UserApi.updateUser); //user/api/

router.post("/admin", authMiddleware(["admin"]), UserApi.createUserAdmin);//user/api/v1/admin 
router.put("/admin/:id", authMiddleware(["admin"]), UserApi.updateUser);
router.delete("/admin/:id", authMiddleware(["admin"]), UserApi.deleteUser);

module.exports = router;
