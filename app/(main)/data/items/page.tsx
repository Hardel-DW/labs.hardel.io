import CodeBlock from '@components/codeblock/CodeBlock';
import { Suspense } from 'react';
import { getSession } from '@libs/session';
import prisma from '@libs/prisma';
import { redirect } from 'next/navigation';
import ItemRepository from '@repositories/Items';

const getData = async (id?: string) => {
    if (!id) redirect('/');
    return await new ItemRepository(prisma.item).findByProject(id);
};

export default async function AuthPage() {
    const session = await getSession();
    const data = await getData(session?.id);

    return (
        <div className={'min-height-view px-[200px] mb-10'}>
            <Suspense fallback={<div>Loading...</div>}>
                <CodeBlock title={'Session.json'} language={'json'}>
                    {JSON.stringify(data, null, 4)}
                </CodeBlock>
            </Suspense>
        </div>
    );
}
