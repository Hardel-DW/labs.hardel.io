import Button from '@/components/form/Button';
import FormInput from '@/components/form/FormInput';
import Link from 'next/link';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function Loading() {
    return (
        <DashboardHeader name={'Your Project'}>
            <hr className={'mb-8'} />

            <div className={'flex mb-8 md:flex-row flex-col gap-y-4'}>
                <div className={'flex flex-auto flex-col'}>
                    <FormInput type={'text'} placeholder="Loading" />
                </div>
                <Link href={'/dashboard/project/new'}>
                    <Button className={'ml-4'}>Your project</Button>
                </Link>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>{Array(9).fill(<LoadedProject />)}</div>
        </DashboardHeader>
    );
}

export function LoadedProject() {
    return (
        <div className="bg-black/50 flex flex-col rounded-xl py-4 px-6 border border-zinc-700 hover:border-white transition ease-in-out duration-300">
            <div>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full animate-pulse bg-zinc-700" />
                    </div>
                    <div className="pl-3 flex flex-col gap-y-1">
                        <span className="block bg-zinc-700 animate-pulse rounded-full w-[150px] h-4" />
                        <span className="block bg-zinc-700 animate-pulse rounded-full w-[150px] h-4" />
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex-auto flex flex-col gap-y-4 justify-between">
                <div className="w-full h-12 rounded animate-pulse bg-zinc-700" />
                <div className="flex justify-between items-end text-sm text-gray-300">
                    <div className="w-16 h-4 rounded animate-pulse bg-zinc-700" />
                </div>
            </div>
        </div>
    );
}
