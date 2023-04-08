'use client';

import { useEffect, useMemo, useState } from 'react';
import FormInput from '@components/form/input';
import SelectMultiple, { Option } from '@components/form/Select/multiple';
import FileInput from '@components/form/FileInput';
import WhiteButton from '@components/form/Button/White';
import { Category } from '@prisma/client';
import Image from 'next/image';
import DefaultItem from '@images/design/item_placeholder.webp';
import { ReadableItemData } from '@definitions/minecraft';
import SelectItem from '@components/form/Select/item';

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: Partial<ReadableItemData>;
    defaultCategory?: Category[];
    onSend?: (item: SendData) => void;
};

export type SendData = {
    id?: string;
    name: string;
    minecraftId: string;
    asset?: File;
    tags: string;
    categories: string[];
};

export default function BaseCreateItem(props: Props) {
    const [name, setName] = useState('');
    const [item, setItem] = useState<Partial<ReadableItemData> | string>();
    const [asset, setAsset] = useState<File>();
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    const displayPreview = useMemo(() => {
        return asset ? URL.createObjectURL(asset) : DefaultItem;
    }, [asset]);

    const options: Option[] = useMemo(() => {
        return (
            props.defaultCategory?.map((category) => ({
                name: category.name,
                value: category.id.toString(),
                shortName: category.name.length > 5 ? category.name.substring(0, 5).trim() + '...' : category.name
            })) || []
        );
    }, [props.defaultCategory]);

    useEffect(() => {
        setName(props.defaultValues?.name ?? '');
        setTags(props.defaultValues?.tag ?? '');
        setCategories(props.defaultValues?.categories?.map((category) => category.id.toString()) ?? []);
        setItem(props.defaultValues?.minecraftId);
        setAsset(undefined);
    }, [props.defaultValues]);

    const minecraftId = useMemo(() => {
        return typeof item === 'string' ? item : item?.minecraftId;
    }, [item]);

    const handleSend = () => {
        const id = props.defaultValues?.id;
        if (!minecraftId) {
            return;
        }

        const sendData: SendData = { id, name, minecraftId, asset, tags, categories };
        props.onSend?.(sendData);
    };

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Name</p>
                    <small className="text-sm text-gray-400">The name of the item displayed only on the website.</small>
                </div>
                <FormInput type={'text'} placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">ID</p>
                    <small className="text-sm font-normal text-zinc-500">
                        This is the ID that is used in the game, you can find it in game with F3 + H.
                    </small>
                </div>
                <SelectItem value={minecraftId} onChange={(item) => setItem(item)} customValue={true} />
                <hr />
            </div>
            <div>
                <div className={'mb-4 flex justify-between items-center'}>
                    <div>
                        <p className="text-xl mb-0 font-bold">Asset</p>
                        <small className="text-sm text-gray-400">The asset of the item, basically the image</small>
                    </div>
                    <Image src={displayPreview} alt={''} className={'w-8 h-8'} width={100} height={100} />
                </div>
                <FileInput value={asset} onChange={setAsset} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Categories</p>
                    <small className="text-sm text-gray-400">The categories of the item, you can select multiple</small>
                </div>
                <SelectMultiple options={options} values={categories} onChange={setCategories} create />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Tags</p>
                    <small className="text-sm text-gray-400">The tags of the item, so the nbt data</small>
                </div>
                <FormInput type={'text'} placeholder={'Tags'} value={tags} onChange={(e) => setTags(e.target.value)} />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                <WhiteButton onClick={() => handleSend()}>{props.isCreating ? 'Create Item' : 'Update Item'}</WhiteButton>
            </div>
        </div>
    );
}
