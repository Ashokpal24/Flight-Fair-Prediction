import express from "express";
import axios from "axios";
import cors from "cors";
import bcrypt from "bcrypt";
import { User, sequelize } from "./db.js";

const app = express();
const port = 3001;

const apiKey = "1c4eb362277f302ba7c94aefffddd4ef";

app.use(cors());
// origin: "https://fictional-enigma-gw7pwwx7g9pf9rjq-5173.app.github.dev",

app.use(express.json());

app.get("/api/flights", async (req, res) => {
  try {
    const response = await axios.get(
      "http://api.aviationstack.com/v1/flights",
      {
        params: {
          access_key: apiKey,
          limit: 10,
        },
      }
    );

    const flightData = response.data;
    res.json(flightData);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(500).json({ error: "Error fetching flight data" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Registration sucessful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ error: "Invalid credential" });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.options("*", cors());
sequelize.sync().then(() => {
  console.log("Database synchronized");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
