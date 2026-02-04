// api/index.js

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5001',
    'http://localhost:3000',
    'https://portofolio-graphic-frontend.vercel.app',
    'https://portfolio-graphic-design-umber.vercel.app'
];

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else if (origin.match(/^https:\/\/.*\.vercel\.app$/)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const connection = require('../conn/connection');
connection();

// Routes
const projectRoutes = require('../routes/projectRoutes');
const skillRoutes = require('../routes/skillRoutes');
const toolRoutes = require('../routes/toolRoutes');
const experienceRoutes = require('../routes/experienceRoutes');
const certificateRoutes = require('../routes/certificateRoutes');
const gdProjectRoutes = require('../routes/gdProjectRoutes');

app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/gd/projects', gdProjectRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 👇 Export handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);