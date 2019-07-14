"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-unused-vars:0 */
var fs_1 = __importDefault(require("fs"));
var GroupModel = /** @class */ (function () {
    function GroupModel() {
        //  admin: jiro
        //  staff: jiro taro
        //
        //  user_map = {
        //    taro: {
        //      staff: true,
        //    },
        //    jiro: {
        //      admin: true,
        //      staff: true,
        //    }
        //  };
        this.user_map = {};
    }
    GroupModel.prototype.apply = function (user) {
        if (user.is_deleted) {
            this.delete(user.username, user.groups);
        }
        else {
            this.add(user.username, user.groups);
        }
    };
    GroupModel.prototype.read = function (path) {
        var content = '';
        if (fs_1.default.existsSync(path)) {
            content = fs_1.default.readFileSync(path).toString();
        }
        this.parse(content);
    };
    GroupModel.prototype.write = function (path) {
        var data = this.toString();
        fs_1.default.writeFileSync(path, data);
    };
    GroupModel.prototype.delete = function (username, group_arr) {
        var _this = this;
        group_arr.forEach(function (groupname) {
            delete (_this.user_map[username][groupname]);
        });
    };
    GroupModel.prototype.exists = function (username, groupname) {
        if (username in this.user_map) {
            if (groupname in this.user_map[username]) {
                return true;
            }
        }
        return false;
    };
    GroupModel.prototype.add = function (username, group_arr) {
        var _this = this;
        if (!(username in this.user_map)) {
            this.user_map[username] = {};
        }
        group_arr.forEach(function (groupname) {
            _this.user_map[username][groupname] = true;
        });
    };
    GroupModel.prototype.toString = function () {
        var group_map = this.flip(this.user_map);
        var groupname_arr = Object.keys(group_map).sort();
        var s_arr = groupname_arr.map(function (groupname) {
            var username_arr = Object.keys(group_map[groupname]).sort();
            var s = groupname + ": " + username_arr.join(' ') + "\n";
            return s;
        });
        return s_arr.join('');
    };
    GroupModel.prototype.flip = function (user_map) {
        var group_map = {};
        Object.keys(user_map).forEach(function (username) {
            Object.keys(user_map[username]).forEach(function (groupname) {
                if (!(groupname in group_map)) {
                    group_map[groupname] = {};
                }
                group_map[groupname][username] = true;
            });
        });
        return group_map;
    };
    GroupModel.prototype.parse = function (content) {
        var _this = this;
        var line_arr = content.split(/\n/);
        line_arr.forEach(function (line) {
            if (line.trim() === '') {
                return;
            }
            var arr = line.split(':');
            var groupname = arr[0];
            var username_arr = arr[1].split(' ');
            username_arr.forEach(function (username) {
                if (username.length === 0) {
                    return;
                }
                _this.add(username, [groupname]);
            });
        });
    };
    return GroupModel;
}());
exports.default = GroupModel;
//# sourceMappingURL=GroupModel.js.map