import { connectDB } from "@/lib/mongodb";
import NoteModel from "@/models/Note";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import NotesGrid from "@/components/NotesGrid";
import { Note } from "@/types/note";

type NotesPageProps = {
    searchParams: Promise<{
        search?: string;
        category?: string;
    }>;
};

export default async function NotesPage({
    searchParams,
}: NotesPageProps) {
    const params = await searchParams;

    await connectDB();

    const filter: Record<string, unknown> = {};

    if (params.search) {
        filter.$or = [
            {
                title: {
                    $regex: params.search,
                    $options: "i",
                },
            },
            {
                content: {
                    $regex: params.search,
                    $options: "i",
                },
            },
        ];
    }

    if (params.category) {
        filter.category = params.category;
    }

    const docs = await NoteModel.find(filter)
        .sort({ updatedAt: -1 })
        .lean();

    const notes: Note[] = docs.map((doc) => ({
        _id: doc._id.toString(),
        title: doc.title,
        content: doc.content,
        category: doc.category as Note["category"],
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
    }));

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 sm:px-8">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-2 text-sm font-medium text-zinc-500">
                        YOUR COLLECTION
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Notes
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        {notes.length}{" "}
                        {notes.length === 1 ? "note" : "notes"}
                    </p>
                </div>

                <SearchBar />
            </div>

            {notes.length === 0 ? (
                <EmptyState />
            ) : (
                <NotesGrid notes={notes} />
            )}
        </main>
    );
}