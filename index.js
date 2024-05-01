require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use process.env.PORT or default to 3001

app.get('/', (req, res) => {
  res.send('Hello World');
  console.log("hi");
});

app.get('/twitter', (req, res) => {
  res.send('Hello Twitter');
  console.log("hi hi");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
