import express, { urlencoded } from "express";
import { config } from "dotenv";
import { ErrorMiddeleware } from "./Middelware/Error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// config variabel define
config({
  path: "./config/config.env",
});

const app = express();

// using middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors for frontend connectivity
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://coursebundler-1-waq8.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// importing Routes
import course from "./Routes/CourseRoutes.js";
import user from "./Routes/UserRoute.js";
import payment from "./Routes/paymentRoutes.js";
import other from "./Routes/OtherRoute.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

// ----------- React Build Serve ------------
app.use(
  express.static(path.join(__dirname, "../CourseBundler_Frontend1X/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../CourseBundler_Frontend1X/build", "index.html")
  );
});

// Error Handler
app.use(ErrorMiddeleware);

export default app;
