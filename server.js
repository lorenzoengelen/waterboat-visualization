const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));