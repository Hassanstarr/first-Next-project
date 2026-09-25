"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    Something went wrong
                </h1>

                <p className="mt-3 text-zinc-500">
                    We couldn't load this page.
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950"
                >
                    Try again
                </button>
            </div>
        </main>
    );
}