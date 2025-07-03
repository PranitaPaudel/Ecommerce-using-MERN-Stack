import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ? OR name = ?",
      [email, name]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "User already exists!" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Insert new user
    await db.query(
      "INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid name or password." });
    }

    const token = jwt.sign({ id: user.id }, "jwtkey", { expiresIn: "1d" });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    const { password: _, ...userData } = user;
    return res.status(200).json(userData);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({ message: "User has been logged out." });
};
