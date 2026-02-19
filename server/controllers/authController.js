import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Shop from "../models/Shop.js";
import { generateToken } from "../utils/generateToken.js";

export async function register(req, res) {
  const { name, shopName, email, password, role = "user" } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name || shopName || email.split("@")[0],
    email,
    password: hashedPassword,
    role
  });

  if (role === "shop") {
    await Shop.create({ owner: user._id, shopName: shopName || `${user.name} Store`, prices: [] });
  }

  return res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  return res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  });
}
