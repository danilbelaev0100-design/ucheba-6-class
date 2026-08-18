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
        error: "OPENAI_API_KEY не найден в Render"
      });
    }

    const prompt = `
Ты — помощник приложения «Учёба» для ученика 6 класса.

Предмет: ${subject || "Математика"}

Задание:
${String(task).trim()}

Реши задание правильно.

Дай:
1. Ответ.
2. Краткое решение по шагам.
3. Простое объяснение для ученика 6 класса.

Не придумывай условие задачи.
Отвечай на русском языке.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:",

                    
