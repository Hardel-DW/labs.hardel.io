'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { magicalPremium as syntax } from '@/libs/theme/magical-prenium';

export default function HighlightSection(props: { children: string; language: string }) {
    return (
        <SyntaxHighlighter language={props.language} style={syntax} wrapLongLines={true} showLineNumbers={true}>
            {props.children}
        </SyntaxHighlighter>
    );
}
