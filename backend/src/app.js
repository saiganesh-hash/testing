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
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "connect-src": ["'self'", "http://localhost:3000", "https://saiganesh-hash.github.io"],
        },
    },
}));
app.use(cors({
    origin: ['https://saiganesh-hash.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Health Check (Root level)
app.get('/health', getHealth);

// API Routes
app.use('/api/v1', v1Routes);

// 404 Handler (Must be after routes)
app.use(notFound);

// Global Error Handler (Must be last)
app.use(errorHandler);

module.exports = app;
