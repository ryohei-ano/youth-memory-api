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

  const { data, error } = await supabase
    .from('memories')
    .insert([{ memory }])

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to insert memory' })
  }

  res.status(200).json({ message: 'Memory saved', data })
}
