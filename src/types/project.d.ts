import { ReadableCategoryData, ReadableItemData, ReadableRecipeData } from '@/types/minecraft';
import { ActivityType } from '@prisma/client';

type ReadableActivityData = {
    id: string;
    message: string;
    asset?: string;
    action: ActivityType;
    projectId?: string;
    createdAt?: number;
    createdBy?: ReadableMemberData;
};

type ReadableProjectData = {
    id: string;
    name: string;
    description: string;
    version: string;
    namespace: string;
    asset: string;
    items: ReadableItemData[];
    recipes: ReadableRecipeData[];
    activities: ReadableActivityData[];
    categories: ReadableCategoryData[];
    users: ReadableMemberData[];
    isSelected?: boolean;
    isInvited?: boolean;
    role?: ProjectRole;
    isOwner?: boolean;
    createdAt?: number;
    updatedAt?: number | null;
};

type ReadableMemberData = {
    userId: string;
    role: ProjectRole;
    joinedAt: number;
    isInvited?: boolean;
    isSelected?: boolean;
    accountData?: {
        email: string;
        name: string;
        avatar: string;
    };
};

/**
 * Used in Dashboard Activity for consulting the activity of a project
 */
export type OutputActivities = {
    month: number;
    year: number;
    data: [
        {
            day: number;
            activities: ReadableActivityData[];
        }
    ];
};
