import React from 'react';
import FormCheckerProvider from '@/components/form/FormCheckerProvider';

export default function Form(props: React.FormHTMLAttributes<HTMLFormElement>) {
    return (
        <FormCheckerProvider>
            <form {...props} />
        </FormCheckerProvider>
    );
}
