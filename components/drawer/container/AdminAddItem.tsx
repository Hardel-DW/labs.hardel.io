'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WhiteButton from '@components/form/Button/White';
import SelectItem from '@components/form/Select/item';

type Props = {
    onClose: () => void;
    categoryId?: string;
};

export default function AdminAddItem(props: Props) {
    const router = useRouter();
    const [itemMinecraftId, setItemMinecraftId] = useState<string>();
    const [id, setId] = useState<string>();

    const sendData = async () => {
        if (!id || !props.categoryId) return;

        /*        connectVanillaItemToCategory(props.categoryId, id)
            .then(() => {
                setItemMinecraftId(undefined);
                router.refresh();
                props.onClose();
            })
            .finally(() => {
                router.refresh();
                props.onClose();
            });*/
    };

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Item</p>
                    <small className="text-sm text-gray-400">The item will be connected to the category.</small>
                </div>
                <SelectItem
                    value={itemMinecraftId}
                    onChange={(item) => {
                        if (!(typeof item === 'string')) {
                            setItemMinecraftId(item?.minecraftId);
                            setId(item?.id);
                        }
                    }}
                />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                <WhiteButton onClick={() => sendData()}>Add Items</WhiteButton>
            </div>
        </div>
    );
}
