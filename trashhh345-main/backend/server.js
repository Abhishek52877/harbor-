import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

app.get('/health', (_, res) => {
  res.json({
    ok: true,
    supabaseConfigured: Boolean(supabase),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/profiles', async (_, res) => {
  if (!supabase) {
    return res.status(400).json({
      error: 'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    });
  }

  const { data, error } = await supabase.from('profiles').select('*').limit(20);
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ data });
});

app.post('/api/profiles', async (req, res) => {
  if (!supabase) {
    return res.status(400).json({
      error: 'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    });
  }

  const { name, role, phone } = req.body || {};
  if (!name || !role) {
    return res.status(400).json({ error: 'name and role are required' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert([{ name, role, phone: phone || null }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ data });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
