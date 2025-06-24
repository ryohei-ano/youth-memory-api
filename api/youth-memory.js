const memories = require('../data/youth_memories_unique.json');

module.exports = (req, res) => {
  const random = memories[Math.floor(Math.random() * memories.length)];
  res.status(200).json(random);
};
