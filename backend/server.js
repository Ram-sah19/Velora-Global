require('dotenv').config();
const path = require('path');

// Load API Gateway & Microservices Cluster
console.log('⚡ Launching Velora Global Decoupled Microservices Architecture...');
require('../services/api-gateway/server.js');
