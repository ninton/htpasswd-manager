/* eslint-env mocha */
import GroupModel from '../libs/GroupModel';

import assert = require('assert');
import fs = require('fs');

describe('GroupModel_1', () => {
  it('add/delete', () => {
    const groupModel = new GroupModel();
    assert.equal(false, groupModel.exists('staff', 'taro'));

    groupModel.add('taro', ['staff']);
    assert.equal(true,  groupModel.exists('taro', 'staff'));

    groupModel.add('jiro', ['staff', 'admin']);
    assert.equal(true,  groupModel.exists('jiro', 'staff'));
    assert.equal(true,  groupModel.exists('jiro', 'admin'));

    groupModel.delete('jiro', ['staff', 'admin']);
    assert.equal(false,  groupModel.exists('jiro', 'staff'));
    assert.equal(false,  groupModel.exists('jiro', 'admin'));
  });

  it('toStinrg', () => {
    const groupModel = new GroupModel();
    groupModel.add('taro', ['staff']);
    groupModel.add('jiro', ['staff', 'admin']);
    const data = groupModel.toString();

    const expected = 'admin: jiro\nstaff: jiro taro\n';

    assert.equal(data, expected);
  });

  it('write', () => {
    const htgroup_path = 'tmp/.htpasswd';
    if (fs.existsSync(htgroup_path)) {
      fs.unlinkSync(htgroup_path);
    }

    const groupModel = new GroupModel();
    groupModel.add('taro', ['staff']);
    groupModel.add('jiro', ['staff', 'admin']);
    groupModel.write(htgroup_path);

    const data = fs.readFileSync(htgroup_path);
    const expected = 'admin: jiro\nstaff: jiro taro\n';
    assert.equal(data, expected);
  });

  it('parse', () => {
    const content = 'staff: taro jiro\nadmin: jiro\n';

    const groupModel = new GroupModel();
    groupModel.parse(content);

    assert.equal(true,  groupModel.exists('taro', 'staff'));
    assert.equal(true,  groupModel.exists('jiro', 'staff'));
    assert.equal(true,  groupModel.exists('jiro', 'admin'));
  });

  it('read', () => {
    const htgroup_path = 'tmp/.htpasswd';
    fs.writeFileSync(htgroup_path, 'staff: taro jiro\nadmin: jiro\n');

    const groupModel = new GroupModel();
    groupModel.read(htgroup_path);

    assert.equal(true,  groupModel.exists('taro', 'staff'));
    assert.equal(true,  groupModel.exists('jiro', 'staff'));
    assert.equal(true,  groupModel.exists('jiro', 'admin'));
  });
});
