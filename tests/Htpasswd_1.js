"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env mocha */
var fs_1 = __importDefault(require("fs"));
var Htpasswd_1 = __importDefault(require("../libs/Htpasswd"));
var UserEntity_1 = __importDefault(require("../libs/UserEntity"));
var assert = require("assert");
var child_process = require("child_process");
var htpasswd_verify = function (path, user, pass) {
    var args = [
        '-vb',
        path,
        user,
        pass,
    ];
    var result = child_process.spawnSync('htpasswd', args);
    return result.stderr.toString();
};
describe('Htpasswd_1', function () {
    it('apply', function () {
        var htpasswd_path = 'tmp/.htpasswd';
        var htpasswd = new Htpasswd_1.default(htpasswd_path);
        if (fs_1.default.existsSync(htpasswd_path)) {
            fs_1.default.unlinkSync(htpasswd_path);
        }
        // taro 1234を追加
        var user_1 = new UserEntity_1.default({
            username: 'taro',
            password: '1234',
            groups: ['taro'],
            is_deleted: false,
            comment: '',
        });
        htpasswd.apply(user_1);
        // taroのパスワードが正しいはず
        var verify_message_1 = htpasswd_verify(htpasswd_path, 'taro', '1234');
        assert.equal('Password for user taro correct.\n', verify_message_1);
        // taro 1234を再度適用しても、.htpasswd内容が変化していないこと
        // (パスワードが同じなら、.htpasswdを変更しないこと)
        var content_1a = fs_1.default.readFileSync(htpasswd_path).toString();
        htpasswd.apply(user_1);
        var content_1b = fs_1.default.readFileSync(htpasswd_path).toString();
        assert.equal(content_1a, content_1b);
        // taroを削除した
        var user_2 = new UserEntity_1.default({
            username: 'taro',
            password: '1234',
            groups: ['taro'],
            is_deleted: true,
            comment: '',
        });
        htpasswd.apply(user_2);
        // taroはないはず
        var verify_message_2 = htpasswd_verify(htpasswd_path, 'taro', '1234');
        assert.equal('User taro not found\n', verify_message_2);
    });
});
//# sourceMappingURL=Htpasswd_1.js.map