"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const defaultSearch = searchParams.get("search") || "";

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;
        
        const params = new URLSearchParams(searchParams.toString());
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }
        
        router.push(`/notes?${params.toString()}`);
    }

    return (
        <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2">
            <Search size={18} className="text-zinc-500" />
            <input
                name="search"
                defaultValue={defaultSearch}
                placeholder="Search notes..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
            />
        </form>
    );
}
