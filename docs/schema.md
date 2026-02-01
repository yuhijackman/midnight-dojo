# Midnight Dojo Database Specification

**Project**: Midnight Dojo  
**Database**: PostgreSQL (Supabase)  
**Version**: 1.0.0  
**Architect**: Senior Database Architect

## 1. Overview
This schema is designed to support a "Zen Modern" learning roadmap application. It prioritizes data isolation (RLS), performance (Indexing), and future scalability (Marketplace/Forking capabilities).

## 2. Extensions & Enums
First, initialize necessary extensions and enumerated types to ensure data consistency.

```sql
-- Auto-update updated_at timestamp
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

-- Status of a Roadmap Node
CREATE TYPE node_status AS ENUM ('locked', 'ready', 'in_progress', 'completed');

-- Type of Learning Resource
CREATE TYPE resource_type AS ENUM ('link', 'memo', 'video', 'book');

-- Visibility Scope (Future proofing for Community Library)
CREATE TYPE visibility_type AS ENUM ('private', 'public');
```

## 3. Tables Definition

### 3.1. Profiles
Public user information. Mirrors `auth.users` but is accessible to the application.

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 3.2. Academies (The Dojos)
The root container for a learning subject. Contains logic for inheritance (forking) and commerce.

```sql
CREATE TABLE academies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Core Content
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '📚', -- Lucide icon name or Emoji
  theme_color TEXT DEFAULT 'indigo', -- Tailwind color key
  
  -- Community & Commerce (Future Proofing)
  visibility visibility_type DEFAULT 'private',
  forked_from UUID REFERENCES academies(id) ON DELETE SET NULL, -- Lineage tracking
  price INTEGER DEFAULT 0, -- 0 = Free
  is_marketplace_listed BOOLEAN DEFAULT false,
  
  -- System
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_academies_user_id ON academies(user_id);
CREATE INDEX idx_academies_visibility ON academies(visibility);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON academies FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
```

### 3.3. Nodes (The Stepping Stones)
The main milestones in a roadmap. Represents a "Big Topic".

```sql
CREATE TABLE nodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  academy_id UUID REFERENCES academies(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT, -- Brief summary of the topic
  status node_status DEFAULT 'ready',
  
  -- Ordering: Fractional Indexing (allows cheap reordering)
  position DOUBLE PRECISION NOT NULL DEFAULT 65535.0,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_nodes_academy_order ON nodes(academy_id, position ASC);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON nodes FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
```

### 3.4. Checkpoints (The Sub-topics / Tasks)
**NEW**: Specific actionable tasks required to complete a Node. Contains Markdown content which can include links, code snippets, or requirements.

```sql
CREATE TABLE checkpoints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID REFERENCES nodes(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL, -- e.g., "Solve LeetCode #1"
  content TEXT, -- Markdown supported. Can contain links.
  is_completed BOOLEAN DEFAULT false,
  
  -- Ordering within the drawer
  position DOUBLE PRECISION NOT NULL DEFAULT 65535.0,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_checkpoints_node_order ON checkpoints(node_id, position ASC);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON checkpoints FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
```

### 3.5. Resources (The Input)
Reference materials pinned to a Node. Distinct from tasks.

```sql
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID REFERENCES nodes(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL,
  url TEXT,
  content TEXT, -- For type='memo'
  type resource_type DEFAULT 'link',
  
  is_ai_suggested BOOLEAN DEFAULT false, -- To style AI suggestions differently
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_resources_node_id ON resources(node_id);
```

## 4. Row Level Security (RLS) Policies
Security architecture relies on strict RLS.

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- 4.1 Profiles
-- Anyone can view profiles (needed for sharing)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 4.2 Academies
-- Owners can do everything
CREATE POLICY "Users can manage own academies" ON academies
  USING (auth.uid() = user_id);

-- Public access (Read-only for Visibility=Public)
CREATE POLICY "Public academies are viewable by everyone" ON academies
  FOR SELECT USING (visibility = 'public');

-- 4.3 Nodes (Cascading Logic)
-- Access logic: If you can access the Academy, you can access the Nodes.
CREATE POLICY "Manage nodes of own academies" ON nodes
  USING (EXISTS (
    SELECT 1 FROM academies WHERE academies.id = nodes.academy_id AND academies.user_id = auth.uid()
  ));

CREATE POLICY "View nodes of public academies" ON nodes
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM academies WHERE academies.id = nodes.academy_id AND academies.visibility = 'public'
  ));

-- 4.4 Checkpoints & Resources (Deep Cascading Logic)
-- Access logic: If you can access the Node (and thus the Academy), you can access these.

-- Checkpoints Policies
CREATE POLICY "Manage checkpoints of own nodes" ON checkpoints
  USING (EXISTS (
    SELECT 1 FROM nodes
    JOIN academies ON nodes.academy_id = academies.id
    WHERE nodes.id = checkpoints.node_id AND academies.user_id = auth.uid()
  ));

CREATE POLICY "View checkpoints of public nodes" ON checkpoints
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM nodes
    JOIN academies ON nodes.academy_id = academies.id
    WHERE nodes.id = checkpoints.node_id AND academies.visibility = 'public'
  ));

-- Resources Policies
CREATE POLICY "Manage resources of own nodes" ON resources
  USING (EXISTS (
    SELECT 1 FROM nodes
    JOIN academies ON nodes.academy_id = academies.id
    WHERE nodes.id = resources.node_id AND academies.user_id = auth.uid()
  ));

CREATE POLICY "View resources of public nodes" ON resources
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM nodes
    JOIN academies ON nodes.academy_id = academies.id
    WHERE nodes.id = resources.node_id AND academies.visibility = 'public'
  ));
```

## 5. Implementation Notes for Agents

- **Fractional Indexing**: When reordering via Drag & Drop, calculate the new position as `(prev_pos + next_pos) / 2`.
- **Marketplace Logic**: Currently, `price` and `is_marketplace_listed` are purely storage fields. No payment logic is required in the MVP.
- **Forking Logic**: When forking, ensure to copy **ALL** child records (nodes -> checkpoints/resources) to new IDs, and link the new Academy via `forked_from`.
