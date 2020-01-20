const express = require('express');
const app = express();
const DB = require('./config/db');
const routes = require('./routes/routes');
const admin = require('./routes/admin');
const path = require('path');

app.use(express.json());
DB();

app.get('/api', (req, res) => {
  res.send('api home');
});
app.use('/api', routes);
app.use('/api/admin', admin);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
