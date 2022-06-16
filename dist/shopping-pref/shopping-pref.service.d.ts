import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class ShoppingPrefService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ShoppingPrefCreateInput): Promise<import(".prisma/client").ShoppingPref>;
    findAll(id: any): Promise<{
        preference: string;
        id: number;
    }[]>;
}
