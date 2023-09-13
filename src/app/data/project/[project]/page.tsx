import { Suspense } from 'react';
import CodeBlock from '@/components/codeblock/CodeBlock';
import { notFound } from 'next/navigation';
import prisma from '@/libs/prisma';
import ProjectRepository from '@repositories/Project';
import AlertInfo from '@/components/alert/AlertInfo';
import { getSession } from '@/libs/session';

type Params = {
    params: {
        project: string;
    };
};

export default async function ProjectDataPage({ params }: Params) {
    const session = await getSession();
    if (!session || !session.id) notFound();
    const project = await new ProjectRepository(prisma.project).findOne(params.project, session.id);

    return (
        <div className={'min-height-view px-[200px] mb-10'}>
            <AlertInfo className={'mb-10'}>
                These data are the JSON used in website frontend. Some values are displayed in a different way than they are stored in the
                database. Exemple: <code>asset</code> is stored as a relative string in the database, but is displayed as a <code>URL</code>{' '}
                in the data. Moreover, the sensible data of other users are not displayed.
            </AlertInfo>

            <Suspense fallback={<div>Loading...</div>}>
                <CodeBlock title={`Project: ${project.name}`} language={'json'}>
                    {JSON.stringify(project, null, 4)}
                </CodeBlock>
            </Suspense>
        </div>
    );
}
