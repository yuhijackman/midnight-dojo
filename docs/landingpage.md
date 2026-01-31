Landing Page Design Instructions: "Midnight Dojo"
1. Objective & Vibe
Create a stunning, atmospheric Landing Page for Midnight Dojo.

Goal: Captivate the visitor immediately with the "Midnight Zen" atmosphere and clearly communicate the app's value: Focus, Structure, and Mastery.

Vibe: Dark, quiet, cinematic, and cozy. Think "Late night coding session meets Zen garden."

Key Metaphor: Clearing the fog of information overload to find a clear path.

2. Technical Stack
Framework: Next.js 14+ (App Router)

Styling: Tailwind CSS (Use the midnight-dojo color palette defined previously).

Animation: Framer Motion is mandatory. Use it for scroll-triggered reveal effects (fade-ins, paths drawing themselves).

Fonts: Shippori Mincho (Serif) for headings, Inter (Sans) for body.

3. Design Philosophy
Dark Mode Only: The LP should be permanently in "Midnight Mode" (bg-dojo-base).

Typography: Use large, elegant Serif fonts for headings.

Negative Space: Use generous padding. Let the content breathe (Ma - 間).

Texture: Keep the subtle noise/washi texture in the background.

4. Page Structure & Copywriting
Implement the following sections in order.

Section 1: The Hero (Above the Fold)
Visuals:

Background: A very subtle, slow-moving particle effect (like dust motes in moonlight) or a faint SVG ripple pattern.

Center: A glowing, vertical "Path" line draws itself downwards as the page loads.

Copy:

Headline (H1, Serif): "Quiet the Noise. Master Your Craft."

Subheadline: "The cozy, focused workspace for developers to organize learning paths and track progress."

CTA Button: "Enter the Dojo" (Solid indigo background, gold border on hover).

Micro-copy: "Free to start. No credit card required."

Section 2: The Problem (The Chaos)
Visuals:

Transition: Fade in from the bottom.

Layout: Text on the left, an abstract illustration on the right representing "Chaos" (scattered icons, browser tabs).

Copy:

Heading: "Lost in the Browser Tab Abyss?"

Body: "You want to learn Rust, master Spanish, and study System Design. But your progress is scattered across Notion, bookmarks, and forgotten tutorials. The noise is overwhelming."

Section 3: The Solution (The Dojo)
Visuals:

Showcase the App UI (Mockup). The UI should look like it's floating in a void.

Highlight the "Context Isolation" feature.

Copy:

Heading: "One Dojo. One Path."

Body: "Separate your pursuits. When you enter the React Dojo, everything else fades away. No distractions. Just you and the next step."

Section 4: Key Features (The Stepping Stones)
Visuals:

Layout: A vertical timeline (the Path) connects these features as you scroll down.

Feature 1: AI Sensei

Icon: A scroll or spark.

Title: "Instant Roadmaps"

Text: "Don't know where to start? Tell the AI Sensei what you want to learn. It generates a structured path of stepping stones in seconds."

Feature 2: The Path

Icon: Footprints or Stones.

Title: "Visual Progress"

Text: "Track your journey with a satisfying, game-like interface designed for serious learners. See how far you've come."

Feature 3: Knowledge Anchors

Icon: Anchor or Pin.

Title: "Curated Resources"

Text: "Pin your favorite articles, videos, and notes directly to each step. Never lose a helpful tutorial again."

Section 5: The Vibe (Emotional Hook)
Visuals:

A quote centered on the screen. Large Serif font. text-dojo-gold.

Copy:

"Learning isn't a race. It's a practice. Treat it with the respect it deserves."

Section 6: Footer & Final CTA
Visuals:

Simple, clean.

Copy:

Headline: "Your Mat is Waiting."

CTA Button: "Start Your Journey"

Links: GitHub, Twitter, Login.

Copyright: "© 2026 Midnight Dojo. Crafted with focus."

5. Animation Details (Framer Motion)
Scroll Reveal: Text and images should slide up (y: 20) and fade in (opacity: 0 -> 1) as they enter the viewport.

The Line: A central vertical line should "grow" downwards as the user scrolls through the Features section, connecting the story.

Hover States: Buttons and Cards should have a "slow glow" effect, not a snappy digital change.

6. CSS / Tailwind Refresher (Colors)
Ensure these colors are used accurately:

Background: #1a1a1a (Dojo Base)

Text: #F8F5F0 (Content)

Muted Text: #A3A3A3 (Muted - Use the updated lighter gray for readability)

Accent: #3B5B88 (Indigo) & #C5A059 (Gold)

Implementation Prompt for Agent
"Please build the Landing Page for Midnight Dojo based on the instructions above. Create a new file src/app/page.tsx (or src/app/(marketing)/page.tsx). Focus on the atmosphere using Framer Motion for entrance animations. Use the provided copy exactly."