"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteNoteButtonProps {
    id: string;
}

export default function DeleteNoteButton({
    id,
}: DeleteNoteButtonProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            router.push("/notes");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete note");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-red-900/50 px-3 py-2 text-sm text-red-400 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Trash2 size={16} />

            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}