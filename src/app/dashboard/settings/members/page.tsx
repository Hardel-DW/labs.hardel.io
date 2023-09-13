import Image from 'next/image';
import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import { ProjectRole } from '@prisma/client';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/form/Button';
import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';
import InvitationBadge from '@/components/badge/Invitation';
import SmallSelect from '@/components/form/select/SmallSelect';
import { ROLES } from '@/libs/constant';
import Harion from 'public/images/logo/harion.webp';
import { inviteMember, removeMember, updateRole } from '@/server/project';
import Form from '@/components/form/Form';

export default async function DashboardMembersPages() {
    const session = await getSession();
    if (!session?.project) redirect('/dashboard');
    const projects = await new ProjectRepository(prisma.project).getMembersData(session.project.id, session.userData.id);

    return (
        <div className={'flex flex-col gap-y-8'}>
            <Form action={inviteMember} className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <input type="hidden" name="id" value={session.project.id} />
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Add new members</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Invite new members to your project, use the email address of the person you want to invite.
                    </p>
                    <div className={'flex flex-row gap-x-2'}>
                        <FormInput required name="email" id="email" placeholder={'hardel@exemple.com'} validate={'^.+\\@.+\\..+$'} />
                    </div>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-end items-center'}>
                        <Button type="submit">Invite</Button>
                    </div>
                </div>
            </Form>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8 border-zinc-600 border-b'}>
                    <h1 className={'text-2xl text-white'}>Members</h1>
                    <p className={'text-zinc-400 text-base mb-0'}>
                        Here is the list of all the members of your project, you can change their role or remove them.
                    </p>
                </div>

                {projects?.users.map((member, index) => (
                    <div key={index} className={'flex flex-row items-center justify-between gap-x-4 p-8 border-zinc-600 border-b'}>
                        <div className={'flex gap-x-6 items-center'}>
                            <div className={'w-10 h-10'}>
                                <Image
                                    className={'w-full h-full rounded-full'}
                                    src={member.accountData?.avatar || Harion}
                                    alt={'Harion'}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className={'flex flex-col'}>
                                <div className={'flex gap-x-2 items-center mb-1 '}>
                                    <p className={'text-white text-base mb-0'}>{member.accountData?.name}</p>
                                    {member.isInvited && <InvitationBadge />}
                                </div>
                                <p className={'text-zinc-400 text-base mb-0'}>{member.accountData?.email}</p>
                            </div>
                        </div>

                        {session.userData.id === member.userId ? (
                            <div className={'text-zinc-400'}>{member.role}</div>
                        ) : (
                            <>
                                {session.project?.session?.role === ProjectRole.OWNER ? (
                                    <div className={'flex items-center gap-x-6'}>
                                        <form action={updateRole}>
                                            <input type="hidden" name="id" value={session.project.id} />
                                            <input type="hidden" name="member" value={member.userId} />
                                            <SmallSelect showSubmit options={ROLES} defaultValue={member.role} />
                                        </form>
                                        <form className="border-l border-zinc-700 pl-4" action={removeMember}>
                                            <input type="hidden" name="id" value={session.project.id} />
                                            <input type="hidden" name="member" value={member.userId} />
                                            <button
                                                type="submit"
                                                className={'text-zinc-400 hover:text-red-700 transition cursor-pointer select-none'}
                                            >
                                                Kick
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className={'text-zinc-400'}>{member.role}</div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
