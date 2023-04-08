import CodeBlock from '@components/codeblock/CodeBlock';
import { Suspense } from 'react';
import prisma from '@libs/prisma';
import LoadingCodeBlock from '@components/codeblock/LoadingCodeBlock';

const ItemPage = async () => (
    <div className={'min-height-view px-[200px] mb-10'}>
        <Suspense fallback={<LoadingCodeBlock />}>
            <CodeBlock title={'Session.json'} language={'json'}>
                {JSON.stringify(await prisma.item.findMany(), null, 4)}
            </CodeBlock>
        </Suspense>
    </div>
);

export default ItemPage;