const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files with proper MIME types
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('mods.json')) {
      // Prevent browser caching for mods.json so users always see the latest mods
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Content-Type', 'application/json');
    }
  }
}));

// Direct route for mods.json
app.get('/mods.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'mods.json'), (err) => {
    if (err) {
      res.status(200).json([]);
    }
  });
});

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
