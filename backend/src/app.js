

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Middlewares
const errorHandler = require('./middleware/errorHandler');

const app = express();

// -------- GLOBAL MIDDLEWARES --------
app.use(cors({
  origin:[ "http://localhost:5173",
  process.env.FRONTEND_URL,
  ], // or your frontend URL
  credentials: true
}));

app.use(express.json());


// -------- ROUTES --------
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.get("/", (req, res) => {
  res.send("📦 Lost & Found API Running...");
});

// -------- ERROR HANDLER --------
app.use(errorHandler);


const PORT = process.env.PORT || 5000;


async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);

    console.log("🗄️ Database connected successfully!");

    console.log("🔥 Trying to start server on port:", PORT);

    app.listen(PORT, (err) => {
      if (err) {
        console.log("❌ Error while starting server:", err);
      } else {
        console.log(`✅ Server running at http://localhost:${PORT}`);
      }
    });

  } catch (err) {
    console.error("🚨 Failed to start server:", err);
    process.exit(1);
  }
}

startServer();


