import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("memories")
      .select("id, memory, created_at");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "DB fetch error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    const random = data[Math.floor(Math.random() * data.length)];
    res.status(200).json(random);
  } catch (err) {
    console.error("Handler crash:", err);
    res.status(500).json({ error: "Server crash" });
  }
}
