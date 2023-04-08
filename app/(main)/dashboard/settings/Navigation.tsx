import SettingsLinks from '@main/dashboard/settings/SettingsLinks';
import React from 'react';
import { Session } from 'next-auth';
import { ProjectRole } from '@prisma/client';

type Props = {
    session: Session | null;
};

export default function Navigation({ session }: Props) {
    const sessionRole = session?.project?.role as ProjectRole;

    return (
        <>
            <SettingsLinks href={'/dashboard/settings'}>General</SettingsLinks>
            {[ProjectRole.OWNER, ProjectRole.ADMIN].some((role) => role === sessionRole) && (
                <>
                    <SettingsLinks href={'/dashboard/settings/members'}>Members</SettingsLinks>
                    <SettingsLinks href={'/dashboard/settings/about'}>About</SettingsLinks>
                </>
            )}
            {sessionRole === ProjectRole.OWNER && <SettingsLinks href={'/dashboard/settings/advanced'}>Advanced</SettingsLinks>}
        </>
    );
}
