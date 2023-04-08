import CodeBlock from '@components/codeblock/CodeBlock';
import { Suspense, use } from 'react';
import { getSession } from '@libs/session';

export default function AuthPage() {
    const session = use(getSession());

    return (
        <div className={'min-height-view px-[200px] mb-10'}>
            <Suspense fallback={<div>Loading...</div>}>
                <CodeBlock title={'Session.json'} language={'json'}>
                    {JSON.stringify(session, null, 4)}
                </CodeBlock>
            </Suspense>
        </div>
    );
}
