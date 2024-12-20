const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // Statik fayllar (Frontend)

app.post("/api/ask", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Savol kiriting" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.json({ response: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: "Xatolik yuz berdi" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
