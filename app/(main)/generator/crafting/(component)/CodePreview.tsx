'use client';

import CodeBlock from '@components/codeblock/CodeBlock';
import { Recipe } from '@definitions/minecraft';
import { useContext, useMemo } from 'react';
import { makeShapelessRecipes } from '@libs/minecraft/crafting/shapeless';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import { makeShapedExactRecipes } from '@libs/minecraft/crafting/shapedExact';
import { makeShapedRecipes } from '@libs/minecraft/crafting/shaped';
import { RecipeType } from '@prisma/client';

export default function CodePreview() {
    const { slots, recipeType } = useContext(CraftingContext);

    const recipe = useMemo(() => {
        const ingredients = slots.filter((element) => element.slot !== 'crafting:result');
        const result = slots.find((element) => element.slot === 'crafting:result');

        let recipe: Recipe;
        if (recipeType === RecipeType.SHAPELESS) recipe = makeShapelessRecipes(ingredients, result);
        else if (recipeType === RecipeType.EXACT_SHAPED) recipe = makeShapedExactRecipes(ingredients, result);
        else recipe = makeShapedRecipes(ingredients, result);

        return recipe;
    }, [recipeType, slots]);

    return (
        <>
            <CodeBlock title={'fileName.json'} language={'json'}>
                {JSON.stringify(recipe, null, 4)}
            </CodeBlock>
        </>
    );
}
