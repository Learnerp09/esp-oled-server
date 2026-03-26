const express = require("express");
const app = express();

// Store text
let text = "Hello Parth 🚀";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Main Website UI
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OLED Control</title>

      <style>
        body {
          text-align: center;
          font-family: Arial;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          padding-top: 50px;
        }

        h1 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        input {
          padding: 12px;
          width: 260px;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 16px;
        }

        button {
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          background: #22c55e;
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-top: 15px;
        }

        button:hover {
          background: #16a34a;
        }

        .card {
          background: rgba(255,255,255,0.05);
          padding: 30px;
          border-radius: 15px;
          display: inline-block;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
        }

        .footer {
          position: fixed;
          bottom: 10px;
          width: 100%;
          font-size: 14px;
          color: #94a3b8;
        }
      </style>
    </head>

    <body>

      <div class="card">
        <h1>📟 OLED Text Controller</h1>

        <form action="/set" method="POST">
          <input type="text" name="msg" placeholder="Enter text" required />
          <br>
          <button type="submit">Update Display</button>
        </form>

        <p style="margin-top:20px;">
          Current Text: <b>${text}</b>
        </p>
      </div>

      <div class="footer">
        🚀 Created by <b>Parth Jain</b> at SGGS
      </div>

    </body>
    </html>
  `);
});

// API for ESP8266
app.get("/text", (req, res) => {
  res.send(text);
});

// Update text
app.post("/set", (req, res) => {
  text = req.body.msg;
  res.redirect("/");
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
