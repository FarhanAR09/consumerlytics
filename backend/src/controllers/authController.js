const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const generateToken = (res, username) => {
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie("jwt", token, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === "production", 
        secure: true, 
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
};

const register = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) return res.status(400).json({ error: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let result;
    try {
        result = await pool.query(
            `INSERT INTO public."User" (username, "passwordHash") VALUES ($1, $2) RETURNING username;`,
            [username, hashedPassword]
        );
    }
    catch (err){
        if (err.code === "23505") {
            return res.status(400).json({ error: "Username or already exists" });
        }
        return res.status(500).json({ error: err.message });
    }

    generateToken(res, username);
    res.status(201).json({ message: "User registered", user: { username } });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const result = await pool.query(`SELECT * FROM public."User" WHERE username = $1`, [username]);
    if (result.rows.length === 0) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, result.rows[0].passwordHash);
    if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

    generateToken(res, username);
    res.json({ message: "Login successful", user: { username } });
};

const logout = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out" });
};

module.exports = {
    register,
    login,
    logout
};
