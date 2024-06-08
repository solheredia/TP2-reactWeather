import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import config from '../config.js';
import weatherRoutes from './routes/weatherRoutes';
app.use('/api', weatherRoutes);


const app = express();

connectDB();

app.use(cors());
app.use(express.json());


