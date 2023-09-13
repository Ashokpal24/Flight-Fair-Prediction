import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

const apiKey = "1c4eb362277f302ba7c94aefffddd4ef";

app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
