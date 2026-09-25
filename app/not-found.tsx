import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
            <div className="text-center">
                <p className="text-sm text-zinc-600">404</p>

                <h1 className="mt-3 text-4xl font-bold">
                    Note not found
                </h1>

                <p className="mt-3 text-zinc-500">
                    The note you're looking for doesn't exist.
                </p>

                <Link
                    href="/notes"
                    className="mt-7 inline-block rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950"
                >
                    Back to notes
                </Link>
            </div>
        </main>
    );
}