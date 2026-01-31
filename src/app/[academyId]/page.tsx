"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import {
	MOCK_ACADEMIES,
	MOCK_NODES,
	type RoadmapNode,
} from "@/features/roadmap/data/mockData";
import { RoadmapPath } from "@/features/roadmap/components/RoadmapPath";
import { motion, AnimatePresence } from "framer-motion";

export default function AcademyDetailPage({
	params,
}: {
	params: Promise<{ academyId: string }>;
}) {
	const { academyId } = use(params);
	const academy = MOCK_ACADEMIES.find((a) => a.id === academyId);
	const nodes = MOCK_NODES[academyId] || [];

	const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

	if (!academy) {
		return (
			<div className="p-20 text-center font-serif">
				道場が見つかりませんでした。
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-dojo-base flex flex-col">
			{/* Header */}
			<header className="px-8 py-4 flex items-center justify-between border-b border-dojo-muted/20 bg-dojo-base/50 backdrop-blur-md sticky top-0 z-30">
				<div className="flex items-center gap-6">
					<Link
						href="/dashboard"
						className="text-dojo-muted hover:text-dojo-primary transition-colors"
					>
						<ArrowLeft size={20} />
					</Link>
					<div>
						<h1 className="font-serif text-lg font-bold text-dojo-content">
							{academy.title}
						</h1>
						<div className="flex items-center gap-2">
							<div className="h-1 w-24 bg-dojo-muted/30 rounded-full overflow-hidden">
								<div
									className="h-full bg-dojo-primary"
									style={{ width: `${academy.progress}%` }}
								/>
							</div>
							<span className="text-[10px] text-dojo-muted uppercase tracking-widest">
								{academy.progress}% Complete
							</span>
						</div>
					</div>
				</div>
			</header>

			<main className="flex-1 relative">
				<RoadmapPath nodes={nodes} onNodeClick={setSelectedNode} />
			</main>

			{/* Simplified Sheet / Drawer */}
			<AnimatePresence>
				{selectedNode && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelectedNode(null)}
							className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
						/>
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-dojo-muted shadow-2xl z-50 p-8 flex flex-col"
						>
							<button
								onClick={() => setSelectedNode(null)}
								className="absolute top-4 right-4 text-dojo-muted hover:text-dojo-content"
							>
								<ArrowLeft className="rotate-180" size={24} />
							</button>

							<div className="mt-8 flex-1 overflow-y-auto">
								<div className="inline-flex items-center gap-2 px-3 py-1 bg-dojo-base text-dojo-primary text-xs font-medium mb-4">
									<BookOpen size={14} />
									<span>STEP {nodes.indexOf(selectedNode) + 1}</span>
								</div>

								<h2 className="font-serif text-2xl text-dojo-content mb-4">
									{selectedNode.title}
								</h2>

								<p className="text-dojo-muted leading-relaxed mb-8">
									{selectedNode.description ||
										"このステップの詳細はまだ設定されていません。学習を開始して、知識を深めましょう。"}
								</p>

								<div className="space-y-6">
									<h3 className="text-xs font-bold text-dojo-content uppercase tracking-widest border-b border-dojo-muted/30 pb-2">
										Resources
									</h3>

									<div className="space-y-3">
										<ResourceLink title="公式ドキュメント" type="link" />
										<ResourceLink title="基礎概念の解説動画" type="video" />
										<ResourceLink title="学習メモ" type="memo" />
									</div>
								</div>
							</div>

							<div className="mt-auto pt-6 border-t border-dojo-muted/30">
								<button className="w-full py-4 bg-dojo-primary text-white font-medium hover:bg-dojo-primary/90 transition-all flex items-center justify-center gap-2">
									<span>学習を完了する</span>
								</button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

import { Video, FileText, Link as LinkIcon } from "lucide-react";

function ResourceLink({ title, type }: { title: string; type: string }) {
	const Icon = type === "video" ? Video : type === "memo" ? FileText : LinkIcon;

	return (
		<a
			href="#"
			className="flex items-center justify-between p-4 bg-dojo-base hover:bg-dojo-muted/10 transition-colors group"
		>
			<div className="flex items-center gap-3">
				<div className="text-dojo-primary">
					<Icon size={18} />
				</div>
				<span className="text-sm text-dojo-content group-hover:text-dojo-primary transition-colors">
					{title}
				</span>
			</div>
			<ExternalLink
				size={14}
				className="text-dojo-muted group-hover:text-dojo-primary"
			/>
		</a>
	);
}
