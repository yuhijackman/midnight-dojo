UI Implementation Instructions: "Midnight Dojo" MVP Prototype

目的とゴール PRDに基づき、「Pathweaver」のUIプロトタイプを実装してください。

ゴール: アプリの「空気感（Cozy & Dojo）」を確認できる、操作可能なモックアップを完成させること。

制約: バックエンド（Supabase）や認証機能は実装しない。すべてのデータはハードコードされたMock Dataを使用すること。

技術セットアップ要件 Framework: Next.js 14+ (App Router)

Styling: Tailwind CSS + shadcn/ui (Components)

Fonts: next/font/google を使用。

Title: Shippori_Mincho (Wait: 400, 700) - For Headers/Logos

Body: Inter or Noto_Sans_JP - For UI Text

Icons: lucide-react (Stroke width: 1.5px for elegant look)

デザイン & スタイリング指示 PRDの "Design System" セクションを厳守し、以下の設定を tailwind.config.ts に反映させてください。

A. Tailwind Config PRD定義のカラーパレット（dojo-base, dojo-content, dojo-primary 等）をカスタムカラーとして登録してください。

B. グローバルスタイル (globals.css) アプリ全体に「和紙」のような質感を持たせるため、以下のスタイルを適用してください。

背景色: dojo-base (#F8F5F0)

テクスチャ: 背景に opacity: 0.03 程度のノイズ画像（SVG pattern）またはきめ細かい粒子を重ねて、デジタルの平坦さを消すこと。

実装する画面とコンポーネント 以下のディレクトリ構成で、モックデータを用いた2つの主要画面を作成してください。

Plaintext

src/ ├── features/ │   ├── academy/components/   # Dashboard Cards │   ├── roadmap/components/   # Roadmap Path, Nodes │   └── roadmap/data/         # mockData.ts (ここにダミーデータを定義) └── app/ ├── (main)/page.tsx       # Dashboard Screen └── [academyId]/page.tsx  # Roadmap Detail Screen 画面1: Dashboard (Entrance) レイアウト:

画面中央に max-width-5xl 程度のコンテナ。

ヘッダー: 左に明朝体で「Pathweaver」、右にAvatar（画像はダミー）。

Greeting Area:

大きな明朝体で「どの道を歩みますか？」と表示。

Academy Grid:

3〜4つの「道場カード」をGrid表示。

カードデザイン: 白背景、極細のボーダー。影（Shadow）は使わず、Hover時に theme_color のボーダー色がふわっと浮かび上がるアニメーション（Transition）をつけること。

画面2: Roadmap Detail (The Dojo) レイアウト:

背景に、薄い色で「枯山水」のような波紋パターン、または縦のガイドラインを配置（装飾）。

Path (飛び石):

画面中央を縦に貫くライン（SVGで手書き風の線を描画）を配置。

Nodes: 円形、または角を丸めた正方形（Squircle）。

Status表現:

completed: 緑（Matsuba）で塗りつぶし。

in_progress: 金（Kintsugi）の枠線 ＋ 白背景。

locked: 半透明（Opacity 0.5）のグレー。

Interaction:

ノード間の線上にHoverすると、小さな「＋」ボタンが出現するUIを作成（クリック動作は console.log で可）。

ノードをクリックすると、画面右側から Sheet (shadcn/ui) が出てきて、リソース詳細が表示されるようにする。

Mock Data 定義 (src/features/roadmap/data/mockData.ts) 以下の構造でダミーデータを作成し、コンポーネントに流し込んでください。

TypeScript

export const MOCK_ACADEMIES = [ { id: '1', title: 'アルゴリズムとデータ構造', themeColor: 'indigo', // Tailwind class: border-indigo-800 text-indigo-800 progress: 35, icon: 'BrainCircuit' }, { id: '2', title: 'Practical Spanish', themeColor: 'rose', // Tailwind class ... progress: 10, icon: 'Languages' } ];

export const MOCK_NODES = [ { id: 'n1', title: 'Introduction to Algorithms', status: 'completed', position: 1000 }, { id: 'n2', title: 'Big O Notation', status: 'in_progress', // ここをハイライト description: 'Understanding time and space complexity.', position: 2000 }, { id: 'n3', title: 'Arrays & Strings', status: 'ready', position: 3000 }, { id: 'n4', title: 'Two Pointers', status: 'locked', position: 4000 } ]; 6. 成功の定義 npm run dev でエラーなく起動する。

トップページに道場カードが並び、美しい。

カードをクリックすると詳細ページへ遷移する。

詳細ページで「飛び石」が縦に並び、スクロールできる。

ノードクリックでドロワーが開く。

全体を通して「静けさ」「和モダン」が感じられること。

