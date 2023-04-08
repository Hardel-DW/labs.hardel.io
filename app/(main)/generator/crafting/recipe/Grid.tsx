'use client';

import { ReadableRecipeData } from '@definitions/minecraft';
import React, { useMemo } from 'react';
import { SearchProjectContext } from '@components/context/SearchContext';
import CraftingTableGUI from '@components/minecraft/gui/crafting/Readable';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import { useRouter } from 'next/navigation';

type Props = {
    data: ReadableRecipeData[];
};

export default function RecipeGrid({ data }: Props) {
    const { search } = React.useContext(SearchProjectContext);
    const router = useRouter();
    const { setRecipeType, setCraftName, setEditingId, setSlotFromIngredients } = React.useContext(CraftingContext);

    const display = useMemo(() => {
        return data?.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase())).reverse();
    }, [data, search]);

    const handleEdit = (data: ReadableRecipeData) => {
        setRecipeType(data.type);
        setCraftName(data.name);
        setSlotFromIngredients(data.ingredients);
        setEditingId(data.id);
        router.push('/generator/crafting');
    };

    return (
        <>
            {display.map((recipe, index) => (
                <div className={'hover:scale-95 transition ease-in-out duration-200 cursor-pointer'} key={recipe.id}>
                    <CraftingTableGUI title={recipe.name} data={recipe} onEdit={() => handleEdit(recipe)} />
                </div>
            ))}
        </>
    );
}
