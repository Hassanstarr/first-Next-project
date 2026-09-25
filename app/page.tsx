import Link from "next/link";
import { ArrowRight, BookOpen, Search, Zap } from "lucide-react";

export default function Home() {
    return (
        <main>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

                <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-5 py-20 sm:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-sm text-zinc-400">
                            <Zap size={14} />
                            Simple thoughts. Organized beautifully.
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                            Your ideas,
                            <span className="block text-zinc-500">
                                all in one place.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                            A fast and minimal notes application built with
                            Next.js, TypeScript, Tailwind CSS and MongoDB.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/notes"
                                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200"
                            >
                                <BookOpen size={18} />
                                View Notes
                            </Link>

                            <Link
                                href="/new"
                                className="flex items-center gap-2 rounded-xl border border-zinc-800 px-5 py-3 font-medium transition hover:border-zinc-700 hover:bg-zinc-900"
                            >
                                Create a Note
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}