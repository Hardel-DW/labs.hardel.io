import DashboardHeader from '@/components/layout/DashboardHeader';

export default function Loading() {
    return (
        <DashboardHeader name={'Your Project'}>
            <hr className={'mb-8'} />

            <div className="flex gap-x-8">
                <div className="flex-shrink-0 border-r border-zinc-700 px-8">
                    <div className="flex justify-center items-center flex-col">
                        <div className="animate-pulse h-6 w-[180px] rounded-md bg-zinc-700" />
                        <div className="animate-pulse h-20 w-20 rounded-full bg-zinc-700" />
                    </div>
                </div>
                <div className="ml-4 w-full flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-2">
                        <div className="animate-pulse h-6 w-1/2 rounded-md bg-zinc-700" />
                        <input
                            className="bg-black/70 w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white"
                            disabled
                            placeholder="Loading..."
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="animate-pulse h-6 w-1/2 rounded-md bg-zinc-700" />
                        <input
                            className="bg-black/70 w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white"
                            disabled
                            placeholder="Loading..."
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="animate-pulse h-6 w-1/2 rounded-md bg-zinc-700" />
                        <textarea
                            rows={4}
                            className="bg-black/70 w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white"
                            disabled
                            placeholder="Loading..."
                        />
                    </div>
                </div>
            </div>
        </DashboardHeader>
    );
}
