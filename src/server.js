const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/user.routes');
const collectionRoutes = require('./routes/collection.routes');

app.use(express.json());
app.use(userRoutes);
app.use(collectionRoutes);
app.use(
  cors({
    origin: '*',
  })
);

app.get('/health', (req, res) => {
  return res.json('up');
});

app.listen(8001, () => {
  console.log(' rodando');
});
