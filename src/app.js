const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const v1Routes = require('./routes/v1');
const { getHealth } = require('./controllers/statusController');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Static assets
app.use(express.static(path.join(__dirname, '../docs')));

// Health Check (Root level)
app.get('/health', getHealth);

// API Routes
app.use('/api/v1', v1Routes);

// 404 Handler (Must be after routes)
app.use(notFound);

// Global Error Handler (Must be last)
app.use(errorHandler);

module.exports = app;
