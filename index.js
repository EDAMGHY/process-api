const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const colors = require('colors');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// * define Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Api Running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`.underline.cyan)
);
