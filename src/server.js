const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(userRoutes);
app.use(cors());

app.get('/health', (req, res) => {
  return res.json('up');
});

app.listen(8000, () => {
  console.log('ta rodando caralho');
});
