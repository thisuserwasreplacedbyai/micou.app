require('dotenv').config();
const express = require('express');

const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});