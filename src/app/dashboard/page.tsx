import React from "react";
import Link from "next/link";
import { MOCK_ACADEMIES } from "@/features/roadmap/data/mockData";
import { AcademyCard } from "@/features/academy/components/AcademyCard";

export default function DashboardPage() {
	return (
		<div className="min-h-screen pb-20">
			{/* Header */}
			<header className="px-8 py-6 flex justify-between items-center border-b border-dojo-muted/30 bg-dojo-base/50 backdrop-blur-sm sticky top-0 z-10">
				<Link href="/">
					<h1 className="font-serif text-2xl font-bold tracking-tight text-dojo-primary hover:opacity-80 transition-opacity">
						Midnight Dojo
					</h1>
				</Link>
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 rounded-full bg-dojo-muted/30 border border-dojo-muted flex items-center justify-center overflow-hidden">
						<span className="text-xs text-dojo-content">YK</span>
					</div>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-8 pt-16">
				{/* Greeting Area */}
				<div className="mb-12">
					<h2 className="font-serif text-4xl md:text-5xl text-dojo-content leading-tight mb-4">
						Enter your Dojo.
					</h2>
					<p className="text-dojo-muted max-w-lg">
						静寂の中で、あなたの成長を形にしましょう。
						選んだ道が、あなたの確かな技術へと繋がります。
					</p>
				</div>

				{/* Academy Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{MOCK_ACADEMIES.map((academy) => (
						<AcademyCard key={academy.id} academy={academy} />
					))}

					{/* Add New Academy Placeholder */}
					<button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-dojo-muted rounded-none hover:border-dojo-primary hover:bg-dojo-primary/5 transition-all group min-h-[200px]">
						<span className="text-3xl text-dojo-muted group-hover:text-dojo-primary mb-2 transition-colors">
							+
						</span>
						<span className="text-sm font-sans text-dojo-muted group-hover:text-dojo-primary transition-colors">
							新しい道場を開く
						</span>
					</button>
				</div>
			</main>
		</div>
	);
}
