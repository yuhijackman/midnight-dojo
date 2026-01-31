import type { Metadata } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

const shipporiMincho = Shippori_Mincho({
	weight: ["400", "700"],
	variable: "--font-serif",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Midnight Dojo | Zen Modern Dojo",
	description: "Organize your learning path in a focused, cozy space.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${inter.variable} ${shipporiMincho.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
