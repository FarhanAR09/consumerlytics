const express = require("express");
const { register, login, logout } = require("../controllers/authController.js");
const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/protected", protect, (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
