import Link from "next/link";
import { Note } from "@/types/note";

interface NoteCardProps {
    note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
    return (
        <Link
            href={`/notes/${note._id}`}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
        >
            <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                    {note.category}
                </span>

                <span className="text-xs text-zinc-600">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </span>
            </div>

            <h2 className="mt-5 line-clamp-2 text-xl font-semibold transition group-hover:text-white">
                {note.title}
            </h2>

            <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-500">
                {note.content}
            </p>
        </Link>
    );
}
