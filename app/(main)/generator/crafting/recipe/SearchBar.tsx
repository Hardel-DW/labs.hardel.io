'use client';

import React, { useContext } from 'react';
import FormInput from '@components/form/input';
import { SearchProjectContext } from '@components/context/SearchContext';
import Switch from '@components/form/Switch';
import WhiteButton from '@components/form/Button/White';
import { ToastContext, ToastStatus } from '@components/toast/ToastContainer';
import { useRouter } from 'next/navigation';

export default function SearchRecipeBar() {
    const { addToast } = useContext(ToastContext);
    const { search, setSearch } = React.useContext(SearchProjectContext);
    const [checked, setChecked] = React.useState(false);
    const [waiting, setWaiting] = React.useState(false);
    const router = useRouter();

    const handleRefresh = () => {
        router.refresh();
        setWaiting(true);

        setTimeout(() => {
            setWaiting(false);
        }, 10000);

        addToast(ToastStatus.INFO, 'Refreshing recipes...', 'The recipes are being refreshed. This may take a while.');
    };

    return (
        <div className={'flex justify-between items-center mb-8'}>
            <div className={'flex gap-x-4'}>
                {!waiting && (
                    <WhiteButton className={'flex-none'} disabled={waiting} onClick={() => handleRefresh()}>
                        Refresh
                    </WhiteButton>
                )}
                <FormInput
                    type="text"
                    placeholder="Search an recipes"
                    className={'min-w-[300px] max-w-[500px]'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Switch onClick={() => setChecked(!checked)} defaultChecked={checked} label={'Animation'} />
        </div>
    );
}
