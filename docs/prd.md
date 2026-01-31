Project Midnight Dojo: 技術仕様書 & 要件定義
1. プロジェクト概要
Pathweaverは、エンジニアの学習体験を「道場（Dojo）」に見立てて整理する、学習ロードマップ管理Webアプリケーションである。 散らばりがちな学習リソースや不明確なゴールを、AIによるガイドとユーザー自身の編集によって「一本の道（Path）」として視覚化し、整理された空間（Cozy Space）で集中して学習できる環境を提供する。
コンセプト
Metaphor: "Zen Modern Dojo"（静謐で、集中できる現代の道場）
Core Value: コンテキストの完全分離。水泳、スペイン語、アルゴリズムなど、異なる学習テーマを独立した「アカデミー」として扱い、頭の切り替えを容易にする。
Vibe: Cozy, Focused, Minimalist, Wabi-Sabi.

2. 技術スタック (Tech Stack)
Frontend
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
UI Library: shadcn/ui, Lucide React
Animation: Framer Motion (道場の没入感演出)
Drag & Drop: dnd-kit (ロードマップの並び替え)
Lint/Format: Biome
Backend / Infrastructure
BaaS: Supabase
Database: PostgreSQL
Auth: Supabase Auth (Google / Apple / GitHub)
ORM/Query: Supabase JS Client (Type-safe)
AI
Integration: Vercel AI SDK
Model: OpenAI (GPT-4o) or Gemini 1.5 Pro via API

3. デザインシステム定義
カラーパレット ("Modern Wabi-Sabi")
Tailwind configに設定すべき色定義。
Base (背景): #F8F5F0 (Washi White)
Content (文字): #2D2D2D (Sumi Black)
Primary (アクセント): #2E4E7E (Indigo - Seikaiha)
Success (完了): #4A6741 (Matcha Green)
Highlight: #C5A059 (Kintsugi Gold)
Muted: #D1CDC7 (Shikkui Gray)
タイポグラフィ
Headings: Serif (Shippori Mincho or Noto Serif JP) - 道場の看板、厳格さ。
Body: Sans-serif (Inter, Noto Sans JP) - 可読性、モダンなツール感。

4. 機能要件 (Core Features)
A. アカデミー（Dojo）管理
ユーザーは複数の「アカデミー」を作成できる。
各アカデミーは完全に独立し、テーマカラーやアイコンを設定可能。
ダッシュボード（エントランス）から各道場へ遷移するUX。
B. ハイブリッド・ロードマップ
AI生成: キーワード（例: "React Native"）を入力すると、AIが学習ステップ（ノード）を自動生成。
手動編集: ユーザーはノードの追加、削除、テキスト編集が可能。
並び替え: dnd-kit を使用し、ノードをドラッグ＆ドロップで並び替え可能。間に新しいノードを「差し込む」UIを提供。
C. ナレッジ・アンカー（リソース管理）
各ノード（ステップ）に紐づくリソース（URL, メモ）を管理。
Space Isolation: そのノードに関連する情報のみを表示し、他の情報のノイズを排除する。

5. データモデル & データベース設計 (Supabase)
SupabaseのSQLエディタで実行する定義。
特記事項
Fractional Indexing: nodes テーブルの position カラムは DOUBLE PRECISION を使用。頻繁な並び替え時のDB負荷を軽減する。
RLS: 全テーブルでRow Level Securityを有効化し、データアクセスを制限。
SQL Schema
SQL
-- 1. Enums
CREATE TYPE node_status AS ENUM ('locked', 'ready', 'in_progress', 'completed');
CREATE TYPE resource_type AS ENUM ('link', 'memo', 'video', 'book');

-- 2. Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Academies (The Dojos)
CREATE TABLE academies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  theme_color TEXT DEFAULT 'indigo',
  icon TEXT DEFAULT '📚', 
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_academies_user_id ON academies(user_id);

-- 4. Nodes (The Stepping Stones)
CREATE TABLE nodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  academy_id UUID REFERENCES academies(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status node_status DEFAULT 'ready',
  position DOUBLE PRECISION NOT NULL DEFAULT 65535.0, -- Fractional Indexing
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_nodes_academy_order ON nodes(academy_id, position ASC);

-- 5. Resources (The Scrolls)
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID REFERENCES nodes(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  content TEXT, 
  type resource_type DEFAULT 'link',
  is_ai_suggested BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_resources_node_id ON resources(node_id);

-- RLS Policies (Simplified)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- (Insert typical RLS policies here ensuring users only access their own data via user_id cascading)


6. ディレクトリ構成 (Feature-based Architecture)
機能単位で関心を分離する構成を採用。
Plaintext
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Login/Signup
│   ├── (main)/           # Dashboard (Entrance)
│   └── [academyId]/      # Academy Detail (The Roadmap)
├── features/             # Business Logic & Components per Domain
│   ├── auth/             
│   ├── academy/          # Academy CRUD
│   ├── roadmap/          # Node UI, Drag&Drop Logic, AI Gen
│   └── resources/        # Resource Drawer & Management
├── components/           # Shared UI (Buttons, Layouts)
│   └── ui/               # shadcn components
├── lib/                  # Utilities (Supabase client, utils)
├── hooks/                # Shared Hooks
└── types/                # Global Types


7. 開発者への指示 (Agent Persona Instructions)
Role: Senior Frontend Architect & UI Designer.
Priorities:
Type Safety: TypeScriptの型定義を厳格に行うこと。
Performance: クライアントサイドでのドラッグ＆ドロップはスムーズに実装すること。
Aesthetics: "Cozy Dojo"の雰囲気を守ること。シャドウを乱用せず、余白と色使いで階層を表現する。
Clean Code: Feature-basedなディレクトリ構造を遵守し、ロジックをコンポーネントにベタ書きしない。
Database Constraints: updated_at の更新にはSupabaseの moddatetime 拡張を使用する前提で実装すること。また、並び替えロジックはFractional Indexingを採用すること。

