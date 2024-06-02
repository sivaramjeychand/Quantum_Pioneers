const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
