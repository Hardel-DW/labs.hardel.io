import Button from '@/components/form/Button';
import FormInput from '@/components/form/FormInput';
import Link from 'next/link';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function LoadingTeamsPages() {
    return (
        <DashboardHeader name={'Teams'}>
            <hr className={'mb-8'} />

            <div className={'flex mb-8 md:flex-row flex-col gap-y-4'}>
                <div className={'flex flex-auto flex-col'}>
                    <FormInput type={'text'} placeholder="Loading" />
                </div>
                <Link href={'/dashboard/project/new'}>
                    <Button className={'md:ml-4 w-full'}>Invite members</Button>
                </Link>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>{Array(9).fill(<LoadedCardMember />)}</div>
        </DashboardHeader>
    );
}

export function LoadedCardMember() {
    return (
        <div className={'bg-black/50 border border-zinc-700 rounded-xl py-4 px-6'}>
            <div className={'flex justify-between items-center'}>
                <div className="flex items-center w-full">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full animate-pulse bg-zinc-700" />
                    </div>
                    <div className="pl-3 w-full flex justify-between">
                        <div className="flex gap-y-2 flex-col">
                            <div className={'flex gap-x-2 items-center'}>
                                <span className="block bg-zinc-700 animate-pulse rounded-full w-16 h-4" />
                                <span className="text-[0.75rem] flex items-center px-2 pt-[1px] h-fit rounded-xl text-white border border-zinc-700">
                                    Loading
                                </span>
                            </div>
                            <span className="block bg-zinc-700 animate-pulse rounded-full w-[150px] h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-full animate-pulse bg-zinc-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}
