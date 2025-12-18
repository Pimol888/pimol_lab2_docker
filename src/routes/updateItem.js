const db = require('../persistence');

module.exports = async (req, res) => {
  await db.updateItem(req.params.id, req.body);
  const item = await db.getItem(req.params.id);
  res.send(item);
};
