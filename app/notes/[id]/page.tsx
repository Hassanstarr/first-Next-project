import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import DeleteNoteButton from "@/components/DeleteNoteButton";

type NotePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function NotePage({
    params,
}: NotePageProps) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        notFound();
    }

    await connectDB();

    const note = await Note.findById(id).lean();

    if (!note) {
        notFound();
    }

    return (
        <main className="mx-auto min-h-screen max-w-4xl px-5 py-10 sm:px-8">
            <Link
                href="/notes"
                className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
                <ArrowLeft size={16} />
                Back to notes
            </Link>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                        {note.category}
                    </span>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/notes/${note._id.toString()}/edit`}
                            className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-700"
                        >
                            Edit
                        </Link>
                        <DeleteNoteButton
                            id={note._id.toString()}
                        />
                    </div>
                </div>

                <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
                    {note.title}
                </h1>

                <div className="mt-4 text-sm text-zinc-600">
                    Updated{" "}
                    {new Date(note.updatedAt).toLocaleString()}
                </div>

                <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-zinc-300">
                    {note.content}
                </div>
            </article>
        </main>
    );
}