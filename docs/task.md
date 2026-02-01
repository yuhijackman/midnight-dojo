# Project Tasks & Roadmap

## 🚀 Phase 1: Foundation & Infrastructure (Backend Setup)
Goal: Establish the database schema and authentication, ensuring future scalability for community features.

### 1.1. Environment Setup
- [ ] Create `.env.local`.
- [ ] Initialize Biome (biome.json) for linting/formatting.
- [ ] **DoD**: App starts without environment errors.

### 1.2. Database Schema Application
- [ ] Enable needed extensions (moddatetime, vector if needed later).
- [ ] Create Tables based on schema.md,
- [ ] Verify RLS policies are enabled for all tables based on docs/schema.md.
- [ ] **DoD**: Tables created. Types generated (supabase gen types).

### 1.3. Supabase Client Integration
- [ ] Install `@supabase/ssr` `@supabase/supabase-js`.
- [ ] Create `src/lib/supabase/server.ts` (Server Client).
- [ ] Create `src/lib/supabase/client.ts` (Browser Client).
- [ ] Create `src/lib/supabase/middleware.ts` for session management (refreshing tokens).
- [ ] **DoD**: Can instantiate Supabase client in both Server Components and Client Components.

### 1.4. Authentication Implementation
- [ ] Create `src/features/auth/` components (`LoginButton`, `AuthForm` etc).
- [ ] Implement Google OAuth flow using Supabase Auth.
- [ ] Create a profile creation trigger (PL/pgSQL) handling new user registration (if not already in SQL).Ensure profiles record is created on user signup (Trigger).
- [ ] **DoD**: User can sign in, sign out, and data is visible in `auth.users` and `public.profiles`.

## 🏛️ Phase 2: Core Features - Academy Management
Goal: Allow users to manage their learning spaces with the "Midnight Zen" aesthetic.

### 2.1. Dashboard Data Fetching
- [ ] Create `src/features/academy/actions.ts` (Server Actions).
- [ ] Implement `getAcademies()` to fetch data from Supabase.
- [ ] Replace Mock Data in `src/app/(main)/page.tsx` with real data.
- [ ] **DoD**: Real academies from DB are displayed in the Grid.

### 2.2. Create Academy Feature
- [ ] Create "Create Academy" Dialog/Modal UI.
- [ ] Implement `createAcademy(data)` Server Action with Zod validation.
- [ ] **DoD**: User can add a new "Dojo" and it immediately appears on the Dashboard.

### 2.3. Academy Settings (Update/Delete)
- [ ] Add "Edit" menu to Academy Cards.
- [ ] Implement update (Title, Theme Color, Visibility) and delete (archive) logic.
- [ ] **DoD**: CRUD operations for Academies work.

## 🛣️ Phase 3: The Path - Roadmap Logic
Goal: Implement the "Node" (Stepping Stone) and "Checkpoint" (Sub-topic) hierarchy.

### 3.1. Nodes Data Fetching
- [ ] Implement `getNodes(academyId)` fetching nodes ordered by position ASC.
- [ ] Replace Mock Data in `src/app/[academyId]/page.tsx`.
- [ ] Render Nodes as a vertical path (SVG line + Stepping Stones).
- [ ] Fetch Nodes ordered by position.
- [ ] DoD: Visual path connects nodes correctly.

### 3.2. Node CRUD Operations
- [ ] Implement "Add Node" feature (Insert new node at the end).
- [ ] Implement "Edit Node" (Title, Description).
- [ ] Implement "Delete Node".
- [ ] **DoD**: Basic manipulation of the path is possible without errors.

### 3.3. Checkpoint Logic (The Drawer)
- [ ] UI: Clicking a Node opens a Right Drawer (Sheet).

- [ ] Display: Show list of checkpoints inside the drawer.

- [ ] Interaction: Checking a box updates is_completed in DB.

- [ ] Markdown: Render content field using react-markdown.

- [ ] DoD: User can complete sub-tasks inside the drawer.

### 3.4. Status Toggling
- [ ] Auto-Update: When all checkpoints are completed, the parent Node status should visually change (e.g., glow Green).
- [ ] DoD: Progress reflects completion of sub-tasks.

### 3.5. Drag & Drop Reordering (Complex)
- [ ] Install `@dnd-kit/core` `@dnd-kit/sortable`.
- [ ] Wrap Nodes in `SortableContext`.
- [ ] Implement Fractional Indexing logic for position updates.
- [ ] Implement `reorderNode(id, newPosition)` Server Action.
- [ ] **DoD**: Dragging a stone updates its position persistenty. Dragging nodes persists new order to DB. No UI flickering.

## 📜 Phase 4: Knowledge Scrolls - Resources
Goal: Manage learning materials separately from nodes.

### 4.1. Resource Fetching
- [ ] Create `src/features/resources/` logic.
- [ ] Fetch resources when a Node is selected (Server Action or SWR/TanStack Query).
- [ ] **DoD**: Clicking a node opens the sheet and shows related links/memos.

### 4.2. Resource Management
- [ ] Add "Add Link" and "Add Memo" forms in the drawer.
- [ ] Implement CRUD for resources.
- [ ] **DoD**: User can save a URL or Markdown note to a specific node.

## 🧠 Phase 5: The Sensei - AI Integration
Goal: Generate structured roadmaps (Nodes + Checkpoints) automatically.

### 5.1. AI SDK Setup
- [ ] Install `ai` and `@ai-sdk/openai` (or google).
- [ ] Configure API routes for streaming response (or use Server Actions `generateText`).
### 5.2. AI Prompt Engineering
- [ ] Design a prompt that outputs a nested JSON structure:
```JSON
{ "nodes": [{ "title": "String Type", "checkpoints": [{ "title": "Solve LeetCode #3", "content": "Link: ..." }] }] }
```
- [ ] Tone: "Zen Master".
### 5.3. "Generate Path" Feature
- [ ] Implement "Generate Path" action.
- [ ] Implement logic to:
    - Receive topic from user.
    - Generate list of steps (Nodes) via LLM.
    - Bulk Insert nodes into DB.
- [ ] **DoD**: User types "React Native", waits a moment, and a full roadmap appears.

🌏 Phase 6: Community & Sharing
Goal: Enable sharing and forking of Dojos.
### 6.1. Public View
- [ ] Create a route src/app/share/[academyId]/page.tsx (accessible to anyone).
- [ ] Implement strict access control: Fetch data only if academy.visibility === 'public'.
- [ ] Render a "Read-only" version of the Roadmap (Nodes are visible but read-only).
- [ ] DoD: A non-logged-in user can visit a link and see the full roadmap content.

### 6.2. The Library (Explore UI)
- [ ] Create a route src/app/library/page.tsx (The "Bookstore" or "Library").
- [ ] Implement a Search Bar to query academies by title or description.
- [ ] Display a Grid of Public Academies (Card UI showing Title, Author Name, and Node count).
- [ ] DoD: User can search for "React" or "Spanish" and see a list of relevant Dojos.

###  6.3. Fork Feature
- [ ] Place a prominent "Fork to My Dojo" button on the Public Detail View (6.1).
- [ ] Implement forkAcademy(originalId) Server Action:
- - Transaction: Deep copy Academy -> Nodes -> Checkpoints -> Resources.
- - Set forked_from column to the original ID.
- - Set the new academy's visibility to 'private' (default).
- - Reset user_id to the current user.
- [ ] DoD: Clicking "Fork" creates a perfect copy in the user's dashboard and redirects them to it.

## ✨ Phase 7: Polishing & Optimization
Goal: Finalize the "Cozy" experience.

### 7.1. UI/UX Refinement
- [ ] Add Loading Skeletons (Shimmer effect) for data fetching.
- [ ] Implement "Empty States" (e.g., when a Dojo has no steps yet).
- [ ] Fine-tune animations (Framer Motion) for entering Academies.

### 7.2. Mobile Responsiveness
- [ ] Check layout on mobile view.
- [ ] Adjust Grid columns and Drawer width.

### 7.3. Error Handling
- [ ] Implement Toast notifications (sonner) for success/error messages.
- [ ] Add Error Boundaries.

### 7.4. Animations
- [ ] Add framer-motion entrance animations for the Path.
- [ ] Add subtle "glow" effects for active nodes.



## Note for Agents:
- **Keep it Clean**: Always follow the "Feature-based" directory structure.
- **Type Safety**: No `any`. Use the generated Database types.
- **Preserve Vibe**: Ensure new components match the "Midnight Zen" dark theme.