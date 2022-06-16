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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const mail_service_1 = require("../mail/mail.service");
const uuid_1 = require("uuid");
const shopping_pref_service_1 = require("../shopping-pref/shopping-pref.service");
let UsersService = class UsersService {
    constructor(prisma, mailService, shoppingPrefService) {
        this.prisma = prisma;
        this.mailService = mailService;
        this.shoppingPrefService = shoppingPrefService;
    }
    async create(createUserDto) {
        try {
            let existingUser = await this.prisma.user.findFirst({
                where: { email: createUserDto.email }
            });
            if (existingUser) {
                throw new common_1.BadRequestException("Email already exist");
            }
            const token = (0, uuid_1.v4)();
            const user = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, createUserDto), { confirmEmailToken: token })
            });
            await this.mailService.sendUserConfirmation(user, token);
            delete user.password;
            delete user.confirmEmailToken;
            delete user.passwordTokenExpiry;
            delete user.resetPasswordToken;
            return user;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async verifyEmail(token) {
        try {
            let user = await this.prisma.user.findFirst({
                where: { confirmEmailToken: token }
            });
            console.log("user - ", user);
            if (user) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { confirmEmailToken: null, isActive: true }
                });
                return "Email verified successfully";
            }
            else {
                throw new common_1.BadRequestException("Token is invalid or expired");
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async resetPassword(resetPasswordDto) {
        try {
            let user = await this.prisma.user.findFirst({
                where: { resetPasswordToken: resetPasswordDto.token }
            });
            console.log("user - ", user);
            if (user) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { resetPasswordToken: null, password: resetPasswordDto.password }
                });
                return "Password chnaged successfully";
            }
            else {
                throw new common_1.BadRequestException("Token is invalid or expired");
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async findUser(email) {
        try {
            return await this.prisma.user.findUnique({
                where: { email: email }
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async sendResetPasswordLink(email) {
        try {
            const token = (0, uuid_1.v4)();
            const passwordTokenExpiry = new Date(Number(new Date()) + 1800000);
            const user = await this.prisma.user.findUnique({
                where: { email: email }
            });
            if (user) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { resetPasswordToken: token, passwordTokenExpiry: passwordTokenExpiry }
                });
                await this.mailService.sendUserConfirmation(user, token);
            }
            return "Password reset link sent if email exist in our system";
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    findAll() {
        return `This action returns all users`;
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            select: { id: true, fullName: true, email: true, dateOfBirth: true, createdAt: true }
        });
        if (!user) {
            throw new common_1.NotFoundException("User does not exist");
        }
        user['shoppingPreferences'] = await this.shoppingPrefService.findAll(id);
        return user;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, mail_service_1.MailService, shopping_pref_service_1.ShoppingPrefService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map