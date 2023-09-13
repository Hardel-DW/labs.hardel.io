'use client';

import { signIn } from 'next-auth/react';
import Button from '@/components/form/Button';

export default function LoginButton() {
    return (
        <Button variant="rainbow" onClick={() => signIn()}>
            Log in
        </Button>
    );
}
