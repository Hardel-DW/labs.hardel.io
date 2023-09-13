export function DashboardFormBox() {
    return (
        <div className="rounded-md w-full bg-black/50 border-zinc-600 border">
            <div className={'p-8'}>
                <div className="animate-pulse h-4 w-1/4 bg-zinc-700 rounded-md" />
                <hr />
                <div className="animate-pulse mb-4 h-8 w-full bg-zinc-700 rounded-md" />
                <div className={'flex flex-row gap-x-2'}>
                    <input
                        className="bg-black/70 w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white"
                        disabled
                        placeholder="Loading..."
                    />
                </div>
            </div>
            <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                <div className={'flex flex-row justify-between items-center'}>
                    <div className="animate-pulse h-8 w-32 bg-zinc-700 rounded-md" />
                    <div className="animate-pulse h-8 w-20 bg-zinc-700 rounded-md" />
                </div>
            </div>
        </div>
    );
}
