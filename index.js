const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const colors = require('colors');
const cors = require('cors');
const { connectDB } = require('./config');
const { errorHandler } = require('./middleware/errorHandler');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * define Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Api Running...' });
});

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/process', require('./routes/process'));
app.use('/api/v1/process-step', require('./routes/process-step'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`.underline)
);
