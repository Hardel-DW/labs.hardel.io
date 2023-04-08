'use client';

import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import Add from '@icons/Common/Add';
import { useContext, useState } from 'react';
import { createRecipe, updateRecipe } from '@libs/request/client/recipe';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import HardelLoader from '@components/loader/HardelLoader';
import { ToastContext } from '@components/toast/ToastContainer';
import GoldButton from '@components/form/Button/Gold';
import Edit from '@icons/Common/Edit';

export default function CraftingGroupButton() {
    const { slots, recipeType, setSlots, craftName, setCraftName, editingId, setEditingId } = useContext(CraftingContext);
    const { addPromiseToast } = useContext(ToastContext);
    const [loading, setLoading] = useState<boolean>(false);

    const handleAdd = () => {
        setLoading(true);
        const promise = createRecipe({
            name: craftName,
            type: recipeType,
            custom: false,
            ingredients: slots
        })
            .then(() => {
                setSlots([]);
                setCraftName('');
            })
            .finally(() => setLoading(false));

        addPromiseToast(
            promise,
            'Successfully recipe added',
            'Failed to create recipe',
            `The crafting recipe ${craftName} has been created successfully.`
        );
    };

    const handleUpdate = () => {
        if (!editingId) return;

        setLoading(true);
        const promise = updateRecipe(editingId, {
            type: recipeType,
            name: craftName,
            ingredients: slots,
            custom: false
        })
            .then(() => {
                setSlots([]);
                setCraftName('');
                setEditingId(undefined);
            })
            .finally(() => setLoading(false));

        addPromiseToast(
            promise,
            'Successfully updated recipe',
            'Failed to update recipe',
            `The crafting recipe ${craftName} has been updated successfully.`
        );
    };

    return (
        <div className={'flex gap-x-4 items-center'}>
            <FormInput type={'text'} placeholder="Craft Name" value={craftName} onChange={(e) => setCraftName(e.target.value)} />
            {loading ? (
                <HardelLoader className={'w-6 h-6 mr-2'} />
            ) : (
                <>
                    {editingId ? (
                        <GoldButton className={'flex items-center'} onClick={() => handleUpdate()}>
                            <Edit className={'w-6 h-6 fill-white mr-2'} />
                            Update
                        </GoldButton>
                    ) : (
                        <WhiteButton
                            className={'flex items-center'}
                            onClick={() => handleAdd()}
                            disabled={craftName.length <= 0 || slots.length <= 0}
                        >
                            <Add className={'w-6 h-6 fill-black mr-2'} />
                            Add
                        </WhiteButton>
                    )}
                </>
            )}
        </div>
    );
}
