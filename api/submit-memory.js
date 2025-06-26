import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { memory } = req.body

  if (!memory || memory.length < 3) {
    return res.status(400).json({ error: 'Memory is too short' })
  }

  // 卑猥ワードの簡易バリデーション
  const bannedWords = [
    'ちんこ', 'まんこ', 'セックス', 'フェラ', 'アナル',
    '中出し', '乳首', '勃起', 'レイプ', '精子',
    '射精', '陰茎', '膣', 'オナニー', '変態'
  ]
  const lower = memory.toLowerCase()
  const isInappropriate = bannedWords.some(word => lower.includes(word))
  if (isInappropriate) {
    return res.status(400).json({ error: 'Inappropriate content' })
  }

  // ランダムID生成
  const memory_id = `memory_${Math.floor(1000 + Math.random() * 9000)}`

  const { data, error } = await supabase
    .from('memories')
    .insert([{ memory, memory_id }])

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to insert memory' })
  }

  res.status(200).json({ message: 'Memory saved', data })
}
