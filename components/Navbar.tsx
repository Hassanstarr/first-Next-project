import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-950">
                        <BookOpen size={19} />
                    </span>

                    <span>Notes</span>
                </Link>

                <Link
                    href="/new"
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
                >
                    <Plus size={17} />
                    New Note
                </Link>
            </div>
        </header>
    );
}