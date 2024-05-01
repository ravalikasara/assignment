require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use process.env.PORT or default to 3001

app.get('/', (req, res) => {
    res.json({ message: 'Hello Twitter' });
  
  
});

app.get('/twitter', (req, res) => {
    res.json({ message: 'Hello Twitter' });
  
});


app.listen(port, async() => {
  console.log(`App listening at http://localhost:${port}`);
  
a = await fetch('http://localhost:3000')
b = await a.json();
console.log(b)
});
