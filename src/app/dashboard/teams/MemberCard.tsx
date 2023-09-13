import { ReadableMemberData } from '@/types/project';
import Image from 'next/image';
import InvitationBadge from '@/components/badge/Invitation';
import Harion from 'public/images/logo/harion.webp';

export default function MemberCard({ member }: { member: ReadableMemberData }) {
    return (
        <div className={'bg-black/50 border border-zinc-700 rounded-xl py-4 px-6'}>
            <div className={'flex justify-between items-center'}>
                <div className="flex items-center w-fit">
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full"
                            width={32}
                            height={32}
                            src={member.accountData?.avatar ?? Harion}
                            alt="user photo"
                        />
                    </div>
                    <div className="pl-3 flex justify-between">
                        <div>
                            <div className={'flex gap-x-2 items-center'}>
                                <span className="block text-lg font-semibold text-white">{member.accountData?.name}</span>
                                <span className="text-[0.75rem] flex items-center px-2 pt-[1px] h-fit rounded-xl text-white border border-zinc-700">
                                    {member.role}
                                </span>
                            </div>
                            <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">
                                {member.accountData?.email}
                            </span>
                        </div>
                        {member.isInvited && <InvitationBadge />}
                    </div>
                </div>
            </div>
        </div>
    );
}
