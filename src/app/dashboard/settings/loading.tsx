import { DashboardFormBox } from '@/components/form/loading/DashboardFormBox';

export default function Loading() {
    return (
        <div className={'flex flex-col gap-y-8'}>
            {Array.from(Array(4).keys()).map((i) => (
                <DashboardFormBox key={i} />
            ))}
        </div>
    );
}
