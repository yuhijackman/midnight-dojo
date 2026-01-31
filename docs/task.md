🚀 Phase 1: Foundation & Infrastructure (Backend Setup)
アプリの心臓部であるデータベースと認証基盤を整備するフェーズ。

[ ] 1.1. Environment Setup

[ ] Create .env.local.

[ ] Define required keys: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, OPENAI_API_KEY (or Google Key).

[ ] DoD: App starts without environment errors.

[ ] 1.2. Database Schema Application

[ ] Execute the defined SQL DDL (Profiles, Academies, Nodes, Resources) in Supabase SQL Editor.

[ ] Verify RLS policies are enabled for all tables.

[ ] DoD: Tables exist in Supabase dashboard with correct columns and types (Enums).

[ ] 1.3. Supabase Client Integration

[ ] Install @supabase/ssr @supabase/supabase-js.

[ ] Create src/lib/supabase/server.ts (Server Client).

[ ] Create src/lib/supabase/client.ts (Browser Client).

[ ] Create src/lib/supabase/middleware.ts for session management (refreshing tokens).

[ ] DoD: Can instantiate Supabase client in both Server Components and Client Components.

[ ] 1.4. Type Generation

[ ] Run supabase gen types to generate TypeScript definitions from the DB schema.

[ ] Save to src/types/database.types.ts.

[ ] DoD: Importing Database type works in code.

[ ] 1.5. Authentication Implementation

[ ] Create src/features/auth/ components (LoginButton, AuthForm etc).

[ ] Implement Google/GitHub OAuth flow using Supabase Auth.

[ ] Create a profile creation trigger (PL/pgSQL) handling new user registration (if not already in SQL).

[ ] DoD: User can sign in, sign out, and data is visible in auth.users and public.profiles.

🏛️ Phase 2: Core Features - Academy Management
「道場（Academy）」の作成・表示・管理機能を実装し、Dashboardを完成させる。

[ ] 2.1. Dashboard Data Fetching

[ ] Create src/features/academy/actions.ts (Server Actions).

[ ] Implement getAcademies() to fetch data from Supabase.

[ ] Replace Mock Data in src/app/(main)/page.tsx with real data.

[ ] DoD: Real academies from DB are displayed in the Grid.

[ ] 2.2. Create Academy Feature

[ ] Create "Create Academy" Dialog/Modal UI.

[ ] Implement createAcademy(data) Server Action with Zod validation.

[ ] DoD: User can add a new "Dojo" and it immediately appears on the Dashboard.

[ ] 2.3. Academy Settings (Update/Delete)

[ ] Add "Edit" menu to Academy Cards.

[ ] Implement update (title, theme color) and delete (archive) logic.

[ ] DoD: Changes to theme color reflect immediately.

🛣️ Phase 3: The Path - Roadmap Logic
最大の難所。リスト表示、並び替え、状態管理を実装する。

[ ] 3.1. Nodes Data Fetching

[ ] Implement getNodes(academyId) fetching nodes ordered by position ASC.

[ ] Replace Mock Data in src/app/[academyId]/page.tsx.

[ ] DoD: The "Stepping Stones" are rendered based on DB records.

[ ] 3.2. Node CRUD Operations

[ ] Implement "Add Node" feature (Insert new node at the end).

[ ] Implement "Edit Node" (Title, Description).

[ ] Implement "Delete Node".

[ ] DoD: Basic manipulation of the path is possible without errors.

[ ] 3.3. Status Toggling

[ ] Add interaction to toggle status (locked -> in_progress -> completed).

[ ] Update UI visuals based on status changes (Matcha Green fill, etc.).

[ ] DoD: Clicking a node updates its status in the DB.

[ ] 3.4. Drag & Drop Reordering (Complex)

[ ] Install @dnd-kit/core @dnd-kit/sortable.

[ ] Wrap Nodes in SortableContext.

[ ] Implement Fractional Indexing logic on the frontend:

Calculate new position based on prev/next nodes when dropped.

[ ] Implement reorderNode(id, newPosition) Server Action.

[ ] DoD: Dragging a stone updates its position persistenty. No UI flickering.

📜 Phase 4: Knowledge Scrolls - Resources
サイドドロワー内のリソース管理機能を実装する。

[ ] 4.1. Resource Fetching

[ ] Create src/features/resources/ logic.

[ ] Fetch resources when a Node is selected (Server Action or SWR/TanStack Query).

[ ] DoD: Clicking a node opens the sheet and shows related links/memos.

[ ] 4.2. Resource Management

[ ] Add "Add Link" and "Add Memo" forms in the drawer.

[ ] Implement CRUD for resources.

[ ] DoD: User can save a URL or Markdown note to a specific node.

🧠 Phase 5: The Sensei - AI Integration
AIによるロードマップ生成機能を統合する。

[ ] 5.1. AI SDK Setup

[ ] Install ai and @ai-sdk/openai (or google).

[ ] Configure API routes for streaming response (or use Server Actions generateText).

[ ] 5.2. "Generate Path" Feature

[ ] Create a Prompt for "Midnight Sensei" (Tone: Zen Master, Output: JSON).

[ ] Implement logic to:

Receive topic from user.

Generate list of steps (Nodes) via LLM.

Bulk Insert nodes into DB.

[ ] DoD: User types "React Native", waits a moment, and a full roadmap appears.

[ ] 5.3. "Suggest Resources" Feature

[ ] Add "Ask Sensei" button in the Resource Drawer.

[ ] Implement logic to fetch curated learning links for the specific node topic.

[ ] DoD: AI suggestions appear with a distinct style (e.g., "Sensei's Choice").

✨ Phase 6: Polishing & Optimization
品質を高め、"Cozy"な体験を完成させる。

[ ] 6.1. UI/UX Refinement

[ ] Add Loading Skeletons (Shimmer effect) for data fetching.

[ ] Implement "Empty States" (e.g., when a Dojo has no steps yet).

[ ] Fine-tune animations (Framer Motion) for entering Academies.

[ ] 6.2. Mobile Responsiveness

[ ] Check layout on mobile view.

[ ] Adjust Grid columns and Drawer width.

[ ] 6.3. Error Handling

[ ] Implement Toast notifications (sonner) for success/error messages.

[ ] Add Error Boundaries.

Note for Agents:

Keep it Clean: Always follow the "Feature-based" directory structure.

Type Safety: No any. Use the generated Database types.

Preserve Vibe: Ensure new components match the "Midnight Zen" dark theme.