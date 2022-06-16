"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingPrefModule = void 0;
const common_1 = require("@nestjs/common");
const shopping_pref_service_1 = require("./shopping-pref.service");
const shopping_pref_controller_1 = require("./shopping-pref.controller");
const prisma_module_1 = require("../prisma.module");
let ShoppingPrefModule = class ShoppingPrefModule {
};
ShoppingPrefModule = __decorate([
    (0, common_1.Module)({
        controllers: [shopping_pref_controller_1.ShoppingPrefController],
        providers: [shopping_pref_service_1.ShoppingPrefService],
        imports: [prisma_module_1.PrismaModule],
        exports: [shopping_pref_service_1.ShoppingPrefService]
    })
], ShoppingPrefModule);
exports.ShoppingPrefModule = ShoppingPrefModule;
//# sourceMappingURL=shopping-pref.module.js.map