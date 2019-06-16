"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env mocha */
var GroupModel_1 = __importDefault(require("../libs/GroupModel"));
var assert = require("assert");
var fs = require("fs");
describe('GroupModel_1', function () {
    it('add/delete', function () {
        var groupModel = new GroupModel_1.default();
        assert.equal(false, groupModel.exists('staff', 'taro'));
        groupModel.add('taro', ['staff']);
        assert.equal(true, groupModel.exists('taro', 'staff'));
        groupModel.add('jiro', ['staff', 'admin']);
        assert.equal(true, groupModel.exists('jiro', 'staff'));
        assert.equal(true, groupModel.exists('jiro', 'admin'));
        groupModel.delete('jiro', ['staff', 'admin']);
        assert.equal(false, groupModel.exists('jiro', 'staff'));
        assert.equal(false, groupModel.exists('jiro', 'admin'));
    });
    it('toStinrg', function () {
        var groupModel = new GroupModel_1.default();
        groupModel.add('taro', ['staff']);
        groupModel.add('jiro', ['staff', 'admin']);
        var data = groupModel.toString();
        var expected = 'admin: jiro\nstaff: jiro taro\n';
        assert.equal(data, expected);
    });
    it('write', function () {
        var htgroup_path = 'tmp/.htpasswd';
        if (fs.existsSync(htgroup_path)) {
            fs.unlinkSync(htgroup_path);
        }
        var groupModel = new GroupModel_1.default();
        groupModel.add('taro', ['staff']);
        groupModel.add('jiro', ['staff', 'admin']);
        groupModel.write(htgroup_path);
        var data = fs.readFileSync(htgroup_path);
        var expected = 'admin: jiro\nstaff: jiro taro\n';
        assert.equal(data, expected);
    });
    it('parse', function () {
        var content = 'staff: taro jiro\nadmin: jiro\n';
        var groupModel = new GroupModel_1.default();
        groupModel.parse(content);
        assert.equal(true, groupModel.exists('taro', 'staff'));
        assert.equal(true, groupModel.exists('jiro', 'staff'));
        assert.equal(true, groupModel.exists('jiro', 'admin'));
    });
    it('read', function () {
        var htgroup_path = 'tmp/.htpasswd';
        fs.writeFileSync(htgroup_path, 'staff: taro jiro\nadmin: jiro\n');
        var groupModel = new GroupModel_1.default();
        groupModel.read(htgroup_path);
        assert.equal(true, groupModel.exists('taro', 'staff'));
        assert.equal(true, groupModel.exists('jiro', 'staff'));
        assert.equal(true, groupModel.exists('jiro', 'admin'));
    });
});
//# sourceMappingURL=GroupModel_1.js.map