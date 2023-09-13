import { z } from 'zod';
import prisma from '@/libs/prisma';
import { Activity, ActivityType, PrismaClient, Project } from '@prisma/client';
import { OutputActivities, ReadableActivityData } from '@/types/project';
import { User } from 'next-auth';

type ActivityData = Activity & {
    project?: Project | null;
    createdBy?: User;
};

export default class ActivityRepository {
    constructor(private readonly prisma: PrismaClient['activity']) {}

    async create(projectId: string, userId: string, message: string, action: ActivityType, asset?: string) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid(),
            message: z.string().min(1).max(100),
            action: z.nativeEnum(ActivityType),
            asset: z.string().optional()
        }).parse({ projectId, userId, message, action, asset });

        return this.prisma.create({
            data: { message, createdById: userId, projectId, action, asset }
        });
    }

    async getAll(projectId: string): Promise<OutputActivities[]> {
        z.string().cuid().parse(projectId);

        const data = await this.prisma.findMany({
            where: { projectId },
            orderBy: { createdAt: 'desc' },
            include: {
                createdBy: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return data.reduce((acc: OutputActivities[], current) => {
            const month = current.createdAt.getMonth();
            const year = current.createdAt.getFullYear();
            const day = current.createdAt.getDate();
            const index = acc.findIndex((item) => item.month === month && item.year === year);
            const activity = this.activityToReadable(current);

            if (index === -1) acc.push({ month, year, data: [{ day, activities: [activity] }] });
            else {
                const dayIndex = acc[index].data.findIndex((item) => item.day === day);
                if (dayIndex === -1) acc[index].data.push({ day, activities: [activity] });
                else acc[index].data[dayIndex].activities.push(activity);
            }

            return acc;
        }, []);
    }

    activitiesToReadable(data: ActivityData[]): ReadableActivityData[] {
        return data.map((activity) => this.activityToReadable(activity));
    }

    activityToReadable(data: ActivityData): ReadableActivityData {
        return {
            ...data,
            action: data.action,
            projectId: data?.project?.id,
            createdBy: data?.createdBy,
            asset: data.asset ?? `${process.env.ASSET_PREFIX}/assets/default_activity.webp`,
            createdAt: data.createdAt.getTime()
        };
    }
}

export const createActivity = (
    projectId: string,
    userId: string,
    message: string,
    action: ActivityType = ActivityType.INFO,
    asset?: string
) => {
    (async () => await new ActivityRepository(prisma.activity).create(projectId, userId, message, action, asset))();
};
