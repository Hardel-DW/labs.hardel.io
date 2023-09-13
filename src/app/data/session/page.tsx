import { Suspense } from 'react';
import CodeBlock from '@/components/codeblock/CodeBlock';
import { getSession } from '@/libs/session';

export default async function ProjectDataPage() {
    const session = await getSession();

    return (
        <div className={'min-height-view px-[200px] mb-10'}>
            <Suspense fallback={<div>Loading...</div>}>
                <CodeBlock title={'Collected Project Data'} language={'json'}>
                    {JSON.stringify(session, null, 4)}
                </CodeBlock>
            </Suspense>
        </div>
    );
}
