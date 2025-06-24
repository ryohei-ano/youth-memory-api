const memories = require('../data/youth_memories_unique.json');

module.exports = (req, res) => {
  // ランダムな記憶を1件取得
  const random = memories[Math.floor(Math.random() * memories.length)];

  // CORS対応（iframeからfetchできるように）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // レスポンスを返す
  res.status(200).json(random);
};
