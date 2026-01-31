"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
	Sparkles,
	Footprints,
	Anchor,
	ArrowRight,
	Github,
	Twitter,
} from "lucide-react";

const FadeIn = ({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.8, delay }}
	>
		{children}
	</motion.div>
);

export default function LandingPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const pathHeight = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<div
			ref={containerRef}
			className="midnight-theme min-h-screen selection:bg-midnight-gold selection:text-midnight-base"
		>
			{/* Section 1: The Hero */}
			<section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
				{/* Particle effect placeholder (subtle) */}
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-midnight-primary/10 rounded-full blur-[120px] animate-pulse" />
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-midnight-gold/5 rounded-full blur-[120px] animate-pulse"
						style={{ animationDelay: "2s" }}
					/>
				</div>

				{/* Vertical Path Line */}
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: "150px" }}
					transition={{ duration: 2, ease: "easeInOut" }}
					className="absolute top-0 w-px bg-gradient-to-b from-transparent via-midnight-gold/50 to-midnight-gold"
				/>

				<div className="relative z-10 text-center max-w-4xl">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
						className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight text-midnight-content"
					>
						Quiet the Noise.
						<br />
						Master Your Craft.
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 1.2 }}
						className="text-midnight-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
					>
						The cozy, focused sanctuary to organize your learning paths —
						whether it&apos;s a new language, an instrument, or a complex
						subject.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 1.8 }}
						className="flex flex-col items-center gap-4"
					>
						<Link
							href="/dashboard"
							className="px-10 py-4 bg-midnight-primary text-midnight-content border border-transparent hover:border-midnight-gold transition-all duration-500 rounded-none text-lg font-medium group flex items-center gap-2"
						>
							Enter Your Dojo
							<ArrowRight
								size={20}
								className="group-hover:translate-x-1 transition-transform"
							/>
						</Link>
						<span className="text-xs text-midnight-muted uppercase tracking-widest">
							Free to start. Open to all aspiring learners.
						</span>
					</motion.div>
				</div>
			</section>

			{/* Section 2: The Problem */}
			<section className="py-32 px-6 max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
					<FadeIn>
						<h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
							Too Many Passions. Too Little Focus.
						</h2>
						<p className="text-midnight-muted text-lg leading-relaxed mb-6">
							You want to speak Italian, understand Economics, and learn
							Photography. But your resources are scattered across bookmarks,
							notes, and open tabs. The mental clutter is holding you back.
						</p>
					</FadeIn>

					<FadeIn delay={0.2}>
						<div className="relative aspect-square border border-midnight-muted/20 flex items-center justify-center group overflow-hidden">
							{/* Abstract Chaos Representation */}
							<div className="absolute inset-0 bg-midnight-primary/5 group-hover:bg-midnight-primary/10 transition-colors duration-700" />
							<div className="relative w-2/3 h-2/3 flex flex-wrap gap-4 justify-center items-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
								{[...Array(12)].map((_, i) => (
									<div
										key={i}
										className="w-12 h-12 bg-midnight-muted/20 border border-midnight-muted/30 rotate-12 group-hover:rotate-0 transition-transform duration-700"
									/>
								))}
							</div>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="font-serif italic text-midnight-muted group-hover:text-midnight-content transition-colors">
									Information Overload
								</span>
							</div>
						</div>
					</FadeIn>
				</div>
			</section>

			{/* Section 3: The Solution */}
			<section className="py-32 px-6 bg-black/20">
				<div className="max-w-6xl mx-auto text-center">
					<FadeIn>
						<h2 className="font-serif text-4xl md:text-5xl mb-8">
							One Dojo. One Path.
						</h2>
						<p className="text-midnight-muted text-lg max-w-2xl mx-auto mb-16">
							Separate your pursuits. When you enter the Spanish Dojo,
							everything else fades away. No distractions. Just you and the next
							step on your journey.
						</p>
					</FadeIn>

					<FadeIn delay={0.3}>
						<div className="relative mx-auto max-w-5xl aspect-video bg-midnight-base border border-midnight-muted/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
							{/* Mockup UI Placeholder */}
							<div className="w-full h-8 border-b border-midnight-muted/20 flex items-center px-4 gap-2">
								<div className="w-2 h-2 rounded-full bg-midnight-muted/30" />
								<div className="w-2 h-2 rounded-full bg-midnight-muted/30" />
								<div className="w-2 h-2 rounded-full bg-midnight-muted/30" />
							</div>
							<div className="p-8 flex flex-col items-center">
								<div className="w-12 h-12 rounded-full border-2 border-midnight-gold mb-12 animate-pulse" />
								<div className="space-y-8 w-px h-64 bg-midnight-gold/30 relative">
									<div className="absolute top-0 -left-2 w-4 h-4 bg-midnight-gold rounded-full" />
									<div className="absolute top-1/2 -left-2 w-4 h-4 border-2 border-midnight-gold bg-midnight-base rounded-full" />
									<div className="absolute bottom-0 -left-2 w-4 h-4 border-2 border-midnight-muted bg-midnight-base rounded-full" />
								</div>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-midnight-base via-transparent to-transparent pointer-events-none" />
						</div>
					</FadeIn>
				</div>
			</section>

			{/* Section 4: Key Features */}
			<section className="py-32 px-6 relative max-w-4xl mx-auto">
				{/* Scroll-drawing line */}
				<div className="absolute left-1/2 top-0 bottom-0 w-px bg-midnight-muted/10 -translate-x-1/2 hidden md:block" />
				<motion.div
					style={{ scaleY: pathHeight }}
					className="absolute left-1/2 top-0 bottom-0 w-px bg-midnight-gold -translate-x-1/2 origin-top hidden md:block"
				/>

				<div className="space-y-40 relative z-10">
					<FeatureItem
						icon={<Sparkles className="text-midnight-gold" size={32} />}
						title="Instant Roadmaps"
						text="Don't know where to start? Tell the AI Sensei what you want to learn. It generates a structured path of stepping stones in seconds."
						index={1}
					/>
					<FeatureItem
						icon={<Footprints className="text-midnight-gold" size={32} />}
						title="Visual Progress"
						text="Track your journey with a satisfying, game-like interface designed for serious learners. See how far you've come."
						index={2}
						reverse
					/>
					<FeatureItem
						icon={<Anchor className="text-midnight-gold" size={32} />}
						title="Curated Resources"
						text="Pin your favorite articles, videos, and notes directly to each step. Never lose a helpful tutorial again."
						index={3}
					/>
				</div>
			</section>

			{/* Section 5: The Vibe */}
			<section className="py-48 px-6 text-center">
				<FadeIn>
					<blockquote className="font-serif text-3xl md:text-5xl text-midnight-gold max-w-4xl mx-auto leading-tight italic">
						To learn is to change.
						<br />
						Create the space for that change to happen.
					</blockquote>
				</FadeIn>
			</section>

			{/* Section 6: Footer & Final CTA */}
			<footer className="py-32 px-6 border-t border-midnight-muted/10">
				<div className="max-w-4xl mx-auto text-center">
					<FadeIn>
						<h2 className="font-serif text-4xl md:text-6xl mb-12">
							Your Mat is Waiting.
						</h2>
						<Link
							href="/dashboard"
							className="inline-block px-12 py-5 bg-midnight-gold text-midnight-base hover:bg-midnight-content transition-all duration-500 font-bold text-lg mb-20"
						>
							Start Your Journey
						</Link>
					</FadeIn>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-midnight-muted">
						<div className="flex justify-center gap-6">
							<a
								href="#"
								className="hover:text-midnight-gold transition-colors"
							>
								<Github size={20} />
							</a>
							<a
								href="#"
								className="hover:text-midnight-gold transition-colors"
							>
								<Twitter size={20} />
							</a>
						</div>
						<div>
							<p>© 2026 Midnight Dojo. Crafted with focus.</p>
						</div>
						<div className="flex justify-center gap-8">
							<a
								href="#"
								className="hover:text-midnight-content transition-colors uppercase tracking-widest text-[10px] font-bold"
							>
								Privacy
							</a>
							<a
								href="#"
								className="hover:text-midnight-content transition-colors uppercase tracking-widest text-[10px] font-bold"
							>
								Terms
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FeatureItem({
	icon,
	title,
	text,
	index,
	reverse = false,
}: {
	icon: React.ReactNode;
	title: string;
	text: string;
	index: number;
	reverse?: boolean;
}) {
	return (
		<div
			className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? "md:flex-row-reverse" : ""}`}
		>
			<div className="flex-1 text-center md:text-left">
				<FadeIn delay={0.2}>
					<div className="flex justify-center md:justify-start mb-6">
						<div className="p-4 bg-midnight-primary/10 border border-midnight-primary/20">
							{icon}
						</div>
					</div>
					<h3 className="font-serif text-2xl mb-4 text-midnight-content">
						{title}
					</h3>
					<p className="text-midnight-muted leading-relaxed">{text}</p>
				</FadeIn>
			</div>

			<div className="hidden md:flex flex-col items-center justify-center relative w-12">
				<div className="w-8 h-8 bg-midnight-base border-2 border-midnight-gold rounded-full z-10 flex items-center justify-center text-[10px] font-bold text-midnight-gold">
					{index}
				</div>
			</div>

			<div className="flex-1" />
		</div>
	);
}
