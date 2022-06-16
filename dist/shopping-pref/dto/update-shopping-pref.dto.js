"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShoppingPrefDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shopping_pref_dto_1 = require("./create-shopping-pref.dto");
class UpdateShoppingPrefDto extends (0, mapped_types_1.PartialType)(create_shopping_pref_dto_1.CreateShoppingPrefDto) {
}
exports.UpdateShoppingPrefDto = UpdateShoppingPrefDto;
//# sourceMappingURL=update-shopping-pref.dto.js.map