import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import dns from "dns";
// Force Node to use Google/Cloudflare DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Notes App",
    description: "A simple notes application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}