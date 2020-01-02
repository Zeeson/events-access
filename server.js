const express = require('express');
const app = express();
const DB = require('./config/db');
const routes = require('./routes/routes');
const admin = require('./routes/admin');
app.use(express.json());
DB();

app.get('/api', (req, res) => {
  res.send('api home');
});
app.use('/api', routes);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
