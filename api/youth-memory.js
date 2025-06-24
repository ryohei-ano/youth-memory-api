import memories from '../data/youth_memories_unique.json';

export default function handler(req, res) {
  const random = memories[Math.floor(Math.random() * memories.length)];
  res.status(200).json(random);
}
