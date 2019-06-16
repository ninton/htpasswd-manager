"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-unused-vars:0 */
var fs_1 = __importDefault(require("fs"));
var child_process = require("child_process");
var Htpasswd = /** @class */ (function () {
    function Htpasswd(path) {
        this.path = path;
    }
    Htpasswd.prototype.apply = function (user) {
        if (user.is_deleted) {
            this.delete(user);
            this.isVerified(user);
            return;
        }
        if (this.isVerified(user)) {
            return;
        }
        this.update(user);
    };
    Htpasswd.prototype.isVerified = function (user) {
        if (!fs_1.default.existsSync(this.path)) {
            return false;
        }
        var args = [
            '-vb',
            this.path,
            user.username,
            user.password,
        ];
        var result = child_process.spawnSync('htpasswd', args);
        var isVerified = result.stderr.toString().search('correct.') >= 0;
        return isVerified;
    };
    Htpasswd.prototype.update = function (user) {
        var opt;
        if (fs_1.default.existsSync(this.path)) {
            opt = '-b';
        }
        else {
            opt = '-cb';
        }
        var args = [
            opt,
            this.path,
            user.username,
            user.password,
        ];
        return child_process.spawnSync('htpasswd', args);
    };
    Htpasswd.prototype.delete = function (user) {
        var args = [
            '-D',
            this.path,
            user.username,
        ];
        return child_process.spawnSync('htpasswd', args);
    };
    return Htpasswd;
}());
exports.default = Htpasswd;
//# sourceMappingURL=Htpasswd.js.map