import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { memory } = req.body;

  if (!memory || memory.trim() === '') {
    return res.status(400).json({ error: 'memory is required' });
  }

  const { data, error } = await supabase
    .from('memories')
    .insert([{ text: memory }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'success', data });
}
