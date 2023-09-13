import { DashboardFormBox } from '@/components/form/loading/DashboardFormBox';

export default function Loading() {
    return (
        <div className={'flex flex-col gap-y-8'}>
            <DashboardFormBox />

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8 border-zinc-600 border-b'}>
                    <div className="animate-pulse mb-4 h-4 w-1/2 bg-zinc-700 rounded-md" />
                    <div className="animate-pulse mb-4 h-8 w-full bg-zinc-700 rounded-md" />
                </div>

                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={'flex flex-row items-center justify-between gap-x-4 p-8 border-zinc-600 border-b'}>
                        <div className={'flex gap-x-6 items-center'}>
                            <div className={'w-10 h-10'}>
                                <div className={'w-full h-full rounded-full bg-zinc-900 animate-pulse'} />
                            </div>
                            <div className={'flex flex-col'}>
                                <div className={'text-white text-base mb-1 w-32 h-4 bg-zinc-900 animate-pulse'} />
                                <div className={'text-zinc-400 text-base mb-0 w-32 h-4 bg-zinc-900 animate-pulse'} />
                            </div>
                        </div>

                        <div className={'flex items-center gap-x-6'}>
                            <div className={'w-32 h-4 bg-zinc-900 animate-pulse'} />
                            <div className={'text-zinc-400 w-32 h-4 bg-zinc-900 animate-pulse'} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
