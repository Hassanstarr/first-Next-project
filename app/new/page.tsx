import NoteForm from "@/components/NoteForm";

export default function NewNotePage() {
    return (
        <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
            <div className="mb-8">
                <p className="text-sm font-medium text-zinc-500">
                    CREATE
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    New Note
                </h1>

                <p className="mt-2 text-zinc-500">
                    Capture an idea before it disappears.
                </p>
            </div>

            <NoteForm />
        </main>
    );
}