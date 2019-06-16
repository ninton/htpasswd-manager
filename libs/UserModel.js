"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var sync_1 = __importDefault(require("csv-parse/lib/sync"));
var UserEntity_1 = __importDefault(require("./UserEntity"));
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.csvRead = function (path) {
        var content = fs_1.default.readFileSync(path).toString();
        return this.csvParse(content);
    };
    UserModel.csvParse = function (content) {
        var _this = this;
        var value_arr_arr = sync_1.default(content);
        if (value_arr_arr.length === 0) {
            throw new Error('csv is empty');
        }
        var user_arr = [];
        var name_arr = value_arr_arr.shift();
        value_arr_arr.forEach(function (value_arr) {
            var user = _this.createUserEntity(name_arr, value_arr);
            user_arr.push(user);
        });
        return user_arr;
    };
    UserModel.createUserEntity = function (name_arr, value_arr) {
        var _this = this;
        var vars = {};
        name_arr.forEach(function (name, index) {
            var value = '';
            if (index < value_arr.length) {
                value = value_arr[index];
            }
            if (name === 'groups') {
                vars[name] = _this.parseGroups(value);
            }
            else if (name === 'is_deleted') {
                vars[name] = _this.parseIsDeleted(value);
            }
            else {
                vars[name] = value;
            }
        });
        var user = new UserEntity_1.default(vars);
        return user;
    };
    UserModel.parseGroups = function (value) {
        var arr = [];
        var arr_arr = sync_1.default(value);
        if (arr_arr.length > 0) {
            arr = arr_arr.shift();
        }
        return arr;
    };
    UserModel.parseIsDeleted = function (value) {
        return !!value;
    };
    return UserModel;
}());
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map