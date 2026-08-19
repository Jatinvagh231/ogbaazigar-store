const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Express 5 / path-to-regexp compatible SPA fallback.
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.endsWith('.json')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`BPModsYT running at http://localhost:${PORT}`);
  });
}

module.exports = app;
