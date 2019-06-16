"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-unused-vars:0 */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var UserModel_1 = __importDefault(require("./UserModel"));
var GroupModel_1 = __importDefault(require("./GroupModel"));
var HtgroupManager = /** @class */ (function () {
    function HtgroupManager(argv) {
        this.args = this.parseArgv(process.argv);
    }
    HtgroupManager.prototype.parseArgv = function (argv) {
        if (argv.length < 4) {
            throw new Error('few argment');
        }
        var user_passwd_json_path = process.argv[2];
        if (!fs_1.default.existsSync(user_passwd_json_path)) {
            throw new Error(user_passwd_json_path + " not exists.");
        }
        var htgroup_path = process.argv[3];
        var dir_htpasswd = path_1.default.dirname(htgroup_path);
        if (!fs_1.default.existsSync(dir_htpasswd)) {
            throw new Error(dir_htpasswd + " not exists.");
        }
        return {
            user_passwd_json_path: user_passwd_json_path,
            htgroup_path: htgroup_path,
        };
    };
    HtgroupManager.prototype.run = function () {
        var user_arr = UserModel_1.default.csvRead(this.args.user_passwd_json_path);
        var groupModel = new GroupModel_1.default();
        groupModel.read(this.args.htgroup_path);
        user_arr.forEach(function (user) {
            groupModel.apply(user);
        });
        groupModel.write(this.args.htgroup_path);
    };
    return HtgroupManager;
}());
exports.default = HtgroupManager;
//# sourceMappingURL=HtgroupManager.js.map