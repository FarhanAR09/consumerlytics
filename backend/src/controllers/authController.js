const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = [
    {username: "123", password: "$2b$10$E66VYvMy76nI6d82pCWlYeyybZisrbQL63DLp1Nh5TNvfHVw5WLSW"} //password: asd
];

const generateToken = (res, username) => {
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
};

const register = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) return res.status(400).json({ message: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = { username, password: hashedPassword };
    users.push(user);

    generateToken(res, username);
    res.status(201).json({ message: "User registered", user: { username } });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: "No username found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    generateToken(res, username);
    res.json({ message: "Login successful", user: { username } });
};

// Logout user
const logout = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out" });
};

module.exports = {
    register,
    login,
    logout
};
