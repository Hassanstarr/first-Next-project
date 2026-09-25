"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Note } from "@/types/note";

const categories = [
    "Personal",
    "Work",
    "Study",
    "Ideas",
];

interface NoteFormProps {
    initialData?: Note;
}

export default function NoteForm({ initialData }: NoteFormProps) {
    const router = useRouter();

    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(initialData?.category || "Personal");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditMode = !!initialData;

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return;
        }

        try {
            setLoading(true);

            const url = isEditMode ? `/api/notes/${initialData._id}` : "/api/notes";
            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            router.push(`/notes/${data.note._id}`);
            router.refresh();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8"
        >
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Title
                </label>

                <input
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="e.g. Understanding Server Components"
                    maxLength={100}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-700 focus:border-zinc-600"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Category
                </label>

                <select
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value as Note["category"])
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-zinc-600"
                >
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Content
                </label>

                <textarea
                    value={content}
                    onChange={(event) =>
                        setContent(event.target.value)
                    }
                    placeholder="Write your note..."
                    rows={12}
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-zinc-700 focus:border-zinc-600"
                />
            </div>

            {error && (
                <p className="rounded-xl border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Note" : "Create Note")}
            </button>
        </form>
    );
}