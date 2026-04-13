-- ============================================================
-- GOON PROTOCOL - Setup do Banco de Dados Supabase
-- Cole este SQL no: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Tabela de Mentores
CREATE TABLE IF NOT EXISTS mentors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  level TEXT DEFAULT 'LVL.80',
  image TEXT,
  bio TEXT,
  detailed_bio TEXT,
  stats JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  note TEXT DEFAULT 'OPERADOR',
  note_color TEXT DEFAULT 'text-blue-600',
  note_rotation TEXT DEFAULT '-rotate-6',
  image_position TEXT,
  achievements TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Eventos (auto-incremento para ID único)
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  time TEXT NOT NULL DEFAULT '09:00',
  day TEXT NOT NULL DEFAULT '01',
  month TEXT NOT NULL DEFAULT 'JAN',
  year TEXT NOT NULL DEFAULT '2025',
  original_time TEXT,
  title TEXT NOT NULL,
  desc TEXT DEFAULT '',
  location TEXT,
  type TEXT DEFAULT 'network',
  icon_name TEXT DEFAULT 'Zap',
  link TEXT,
  exclusive_tag TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Resultados (Cases de Sucesso)
CREATE TABLE IF NOT EXISTS results (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  role TEXT DEFAULT 'ELITE MEMBER',
  impact TEXT NOT NULL DEFAULT '',
  impact_label TEXT,
  thumbnail TEXT,
  video TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Políticas de Segurança (Row Level Security)
-- Visitantes podem LER, apenas autenticados podem ESCREVER
-- Como o admin usa anon key, liberamos WRITE para anon também
-- ============================================================

ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Leitura pública (todos os visitantes podem ler)
CREATE POLICY "Leitura pública mentors" ON mentors FOR SELECT USING (true);
CREATE POLICY "Leitura pública events" ON events FOR SELECT USING (true);
CREATE POLICY "Leitura pública results" ON results FOR SELECT USING (true);

-- Escrita via anon key (admin autenticado pelo frontend)
CREATE POLICY "Admin pode inserir mentors" ON mentors FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin pode atualizar mentors" ON mentors FOR UPDATE USING (true);
CREATE POLICY "Admin pode deletar mentors" ON mentors FOR DELETE USING (true);

CREATE POLICY "Admin pode inserir events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin pode atualizar events" ON events FOR UPDATE USING (true);
CREATE POLICY "Admin pode deletar events" ON events FOR DELETE USING (true);

CREATE POLICY "Admin pode inserir results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin pode atualizar results" ON results FOR UPDATE USING (true);
CREATE POLICY "Admin pode deletar results" ON results FOR DELETE USING (true);

-- Tabela de Produtos (Vitrine)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Zap',
  type TEXT DEFAULT 'product',
  duration TEXT,
  duration_label TEXT,
  date_tag TEXT,
  original_price TEXT,
  price TEXT,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura pública products" ON products FOR SELECT USING (true);
CREATE POLICY "Admin pode inserir products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin pode atualizar products" ON products FOR UPDATE USING (true);
CREATE POLICY "Admin pode deletar products" ON products FOR DELETE USING (true);

-- ============================================================
-- Verificação
-- ============================================================
SELECT 'Tabelas criadas com sucesso!' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
