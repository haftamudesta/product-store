import dotenv from'dotenv';
import express from'express';
import cors from'cors';
import helmet from'helmet';
import morgan from'morgan';
import ProductRouter from "./routes/ProductRoutes.js"
import { sql } from './config/DataBase.js';
import {aj} from "./libs/arcjet.js"

dotenv.config();

const app = express();


const PORT=process.env.PORT
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get(async (req, res,next) => {
    try {
        const decision = await aj.protect(req, { requested: 5 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too Many Requests" });
              }else if (decision.reason.isBot()) {
                res.status(403).json({ error: "Bot Access denied" });
              }else {
                res.status(403).json({ error: "Forbidden" });
              }
              return
        }
        next()

    } catch (error) {
        console.log("Arcjet Error")
        next()
    }
})

app.use("/api",ProductRouter)

async function initializeDB() {
        try {
            await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
            console.log("Database initialized successfully");
        } catch (error) {
            console.log("Error initializing database", error);
            // Rethrow to prevent server from starting if DB setup fails
            throw error;
        }
    }

    initializeDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Connected to Neon PostgreSQL database`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize application:", err);
        process.exit(1);
    });