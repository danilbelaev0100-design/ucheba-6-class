const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname)));


// Проверка сервера
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Сервер Учёба работает!"
  });
});


// Решение задания через ИИ
app.post("/api/solve", async (req, res) => {
  try {
    const { task, subject } = req.body;

    if (!task || !String(task).trim()) {
      return res.status(400).json({
        ok: false,
        error: "Задание не введено"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        
