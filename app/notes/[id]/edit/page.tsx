import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import NoteModel from "@/models/Note";
import NoteForm from "@/components/NoteForm";
import { Note } from "@/types/note";

type EditNotePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditNotePage({
    params,
}: EditNotePageProps) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        notFound();
    }

    await connectDB();

    const doc = await NoteModel.findById(id).lean();

    if (!doc) {
        notFound();
    }

    const initialData: Note = {
        _id: doc._id.toString(),
        title: doc.title,
        content: doc.content,
        category: doc.category as Note["category"],
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
    };

    return (
        <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
            <div className="mb-8">
                <p className="text-sm font-medium text-zinc-500">
                    EDIT
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    Edit Note
                </h1>

                <p className="mt-2 text-zinc-500">
                    Update your thoughts.
                </p>
            </div>

            <NoteForm initialData={initialData} />
        </main>
    );
}
