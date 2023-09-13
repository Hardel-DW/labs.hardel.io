import SettingsLinks from '@/app/dashboard/settings/SettingsLinks';
import { ProjectRole } from '@prisma/client';
import { getSession } from '@/libs/session';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    return (
        <DashboardHeader name={'Settings'}>
            <hr className={'mb-8'} />
            <div className={'flex flex-1 relative'}>
                <div className={'flex pr-4 py-4 flex-col font-semibold border-zinc-600 border-r gap-y-4 sticky top-16 w-[240px] mr-6'}>
                    <SettingsLinks href={'/dashboard/settings'}>General</SettingsLinks>
                    {[ProjectRole.OWNER, ProjectRole.ADMIN].some((role) => role === session?.project?.session?.role) && (
                        <>
                            <SettingsLinks href={'/dashboard/settings/members'}>Members</SettingsLinks>
                            <SettingsLinks href={'/dashboard/settings/about'}>About</SettingsLinks>
                        </>
                    )}

                    {session && session.project?.session?.role === ProjectRole.OWNER && (
                        <SettingsLinks href={'/dashboard/settings/advanced'}>Advanced</SettingsLinks>
                    )}
                </div>
                <div className={'flex flex-col flex-1 ml-6'}>{children}</div>
            </div>
        </DashboardHeader>
    );
}
