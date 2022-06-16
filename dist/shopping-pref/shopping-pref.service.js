"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingPrefService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ShoppingPrefService = class ShoppingPrefService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingPref = await this.prisma.shoppingPref.findFirst({
            where: {
                userId: data.userId,
                preference: data.preference
            }
        });
        if (!existingPref) {
            return await this.prisma.shoppingPref.create({
                data
            });
        }
        else {
            throw new common_1.BadRequestException("Already added as a preference");
        }
    }
    async findAll(id) {
        return await this.prisma.shoppingPref.findMany({
            where: {
                userId: id
            },
            select: { id: true, preference: true }
        });
    }
};
ShoppingPrefService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShoppingPrefService);
exports.ShoppingPrefService = ShoppingPrefService;
//# sourceMappingURL=shopping-pref.service.js.map