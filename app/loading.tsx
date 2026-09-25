export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-40 rounded-lg bg-zinc-900" />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="h-64 rounded-2xl bg-zinc-900"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}