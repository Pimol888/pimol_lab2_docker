const express = require('express');
const app = express();
const db = require('./src/persistence');
const { v4: uuid } = require('uuid');

app.use(express.json());
app.use(express.static('public'));
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});


app.get('/items', async (req, res) => {
  const items = await db.getItems();
  res.send(items);
});

app.post('/items', async (req, res) => {
  const item = {
    id: uuid(),
    name: req.body.name,
    completed: false
  };
  await db.storeItem(item);
  res.send(item);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
