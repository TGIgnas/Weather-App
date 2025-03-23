const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/log-city", (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: "City is required." });
  }

  console.log(`City selected: ${city}`);

  res.status(200).json({ message: `City ${city} logged successfully.` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
