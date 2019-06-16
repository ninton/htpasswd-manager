"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-unused-vars:0 */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var UserModel_1 = __importDefault(require("./UserModel"));
var Htpasswd_1 = __importDefault(require("./Htpasswd"));
var HtpasswdManager = /** @class */ (function () {
    function HtpasswdManager(argv) {
        this.args = this.parseArgv(process.argv);
    }
    HtpasswdManager.prototype.parseArgv = function (argv) {
        if (argv.length < 4) {
            throw new Error('few argment');
        }
        var user_csv_path = process.argv[2];
        if (!fs_1.default.existsSync(user_csv_path)) {
            throw new Error(user_csv_path + " not exists.");
        }
        var htpasswd_path = process.argv[3];
        var dir_htpasswd = path_1.default.dirname(htpasswd_path);
        if (!fs_1.default.existsSync(dir_htpasswd)) {
            throw new Error(dir_htpasswd + " not exists.");
        }
        return {
            user_csv_path: user_csv_path,
            htpasswd_path: htpasswd_path,
        };
    };
    HtpasswdManager.prototype.run = function () {
        var user_arr = UserModel_1.default.csvRead(this.args.user_csv_path);
        var htpasswd = new Htpasswd_1.default(this.args.htpasswd_path);
        user_arr.forEach(function (user) {
            htpasswd.apply(user);
        });
    };
    return HtpasswdManager;
}());
exports.default = HtpasswdManager;
//# sourceMappingURL=HtpasswdManager.js.map