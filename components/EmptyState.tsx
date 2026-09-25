import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="rounded-2xl border border-dashed border-zinc-800 py-24 text-center">
            <h2 className="text-xl font-semibold">
                No notes found
            </h2>

            <p className="mt-2 text-zinc-500">
                Create your first note to get started.
            </p>

            <Link
                href="/new"
                className="mt-6 inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-950"
            >
                Create Note
            </Link>
        </div>
    );
}
