import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { setRoutes } from './routes/index';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
setRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log('The server is running successfully.');
});
