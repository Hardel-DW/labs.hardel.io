import { Suspense } from 'react';
import CodeBlock from '@/components/codeblock/CodeBlock';
import { notFound } from 'next/navigation';
import UserDataRepository from '@repositories/UserData';
import prisma from '@/libs/prisma';
import { getSession } from '@/libs/session';

export default async function ProjectDataPage() {
    const session = await getSession();
    if (!session || !session.id) notFound();
    const projects = await new UserDataRepository(prisma.userData).findProjectsByUserId(session.id);

    return (
        <div className={'min-height-view px-[200px] mb-10'}>
            <Suspense fallback={<div>Loading...</div>}>
                <CodeBlock title={'Collected Project Data'} language={'json'}>
                    {JSON.stringify(projects, null, 4)}
                </CodeBlock>
            </Suspense>
        </div>
    );
}
