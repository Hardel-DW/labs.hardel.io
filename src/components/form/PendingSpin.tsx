'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import HardelLoader from '@/components/HardelLoader';

export default function PendingSpin() {
    const { pending } = useFormStatus();

    return <>{pending && <HardelLoader />}</>;
}
