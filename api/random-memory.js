import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .order('random_value') // 事前に random_value カラムがある前提
    .limit(1)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
