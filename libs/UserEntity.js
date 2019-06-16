"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserEntity = /** @class */ (function () {
    function UserEntity(vars) {
        if (vars === void 0) { vars = undefined; }
        this.username = '';
        this.password = '';
        this.groups = [];
        this.is_deleted = false;
        this.comment = '';
        if (vars === undefined) {
            return;
        }
        this.username = vars.username;
        this.password = vars.password;
        this.groups = vars.groups;
        this.is_deleted = vars.is_deleted;
        this.comment = vars.comment;
    }
    return UserEntity;
}());
exports.default = UserEntity;
//# sourceMappingURL=UserEntity.js.map