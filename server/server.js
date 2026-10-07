import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "student@skillswap.edu" && password === "skillswap") {
    return res.json({
      success: true,
      message: "Login successful",
      user: { email, name: "SkillSwap Student" }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`SkillSwap server running at http://localhost:${PORT}`);
});
