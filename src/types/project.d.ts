import { ReadableCategoryData, ReadableItemData, ReadableRecipeData } from '@/types/minecraft';
import { ActivityType, ProjectRole } from '@prisma/client';
import { User } from 'next-auth';

type ReadableActivityData = {
    id: string;
    message: string;
    asset?: string;
    action: ActivityType;
    projectId?: string;
    createdAt?: number;
    createdBy?: User;
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
    createdAt?: number;
    updatedAt?: number | null;
    session?: {
        role?: ProjectRole;
        isSelected?: boolean;
        isInvited?: boolean;
        isOwner?: boolean;
    };
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
