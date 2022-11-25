'use client';

import { useEffect, useState } from 'react';
import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import RedButton from '@components/form/Button/Red';
import { useRouter } from 'next/navigation';
import { deleteVanillaCategory, upsertVanillaCategory } from '@libs/request/client/minecraft/category';
import SelectItem from '@components/form/Select/item';

export type AdminCategoryDefaultValue = {
    name: string;
    id: number;
    asset: string;
};

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: AdminCategoryDefaultValue;
};

export default function AdminCategory(props: Props) {
    const router = useRouter();
    const [name, setName] = useState('Yay');
    const [itemMinecraftId, setItemMinecraftId] = useState<string | undefined>('minecraft:stone');

    const sendData = async () => {
        if (!name || !itemMinecraftId) return;

        await upsertVanillaCategory(name, itemMinecraftId, props.defaultValues?.id, (success) => {
            if (success) {
                setName('Yay');
                setItemMinecraftId('minecraft:stone');
                router.refresh();
                props.onClose();
            }
        });
    };

    const handleDelete = async () => {
        if (props.defaultValues?.id) {
            await deleteVanillaCategory(props.defaultValues.id, (success) => {
                if (success) {
                    router.refresh();
                    props.onClose();
                }
            });
        }
    };

    useEffect(() => {
        if (props.defaultValues) {
            const { name, asset } = props.defaultValues;
            let newAsset = asset;
            if (newAsset.startsWith('https://')) {
                const split = newAsset.split('/');
                const fileName = split[split.length - 1];
                newAsset = fileName.split('.')[0];
            }

            setName(name);
            setItemMinecraftId('minecraft:' + newAsset);
        }
    }, [props.defaultValues]);

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Name</p>
                    <small className="text-sm text-gray-400">The name will be displayed on the website.</small>
                </div>
                <FormInput type={'text'} placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Asset</p>
                    <small className="text-sm text-gray-400">The asset will be displayed depending on the id of the item.</small>
                </div>
                <SelectItem value={itemMinecraftId} onChange={(item) => setItemMinecraftId(item?.minecraftId)} />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                {!props.isCreating && <RedButton onClick={() => handleDelete()}>Delete Category</RedButton>}
                <WhiteButton onClick={() => sendData()}>{props.isCreating ? 'Create' : 'Update'}</WhiteButton>
            </div>
        </div>
    );
}