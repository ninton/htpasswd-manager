/* eslint-env mocha */
import fs from 'fs';
import Htpasswd from '../libs/Htpasswd';
import UserEntity from '../libs/UserEntity';

import assert = require('assert');
import child_process = require('child_process');


const htpasswd_verify = (path:string, user:string, pass:string) => {
  const args = [
    '-vb',
    path,
    user,
    pass,
  ];
  const result = child_process.spawnSync('htpasswd', args);
  return result.stderr.toString();
};

describe('Htpasswd_1', () => {
  it('apply', () => {
    const htpasswd_path  = 'tmp/.htpasswd';
    const htpasswd = new Htpasswd(htpasswd_path);

    if (fs.existsSync(htpasswd_path)) {
      fs.unlinkSync(htpasswd_path);
    }

    // taro 1234を追加
    const user_1 = new UserEntity({
      username: 'taro',
      password: '1234',
      groups:   ['taro'],
      is_deleted:  false,
      comment: '',
    });
    htpasswd.apply(user_1);

    // taroのパスワードが正しいはず
    const verify_message_1 = htpasswd_verify(htpasswd_path, 'taro', '1234');
    assert.equal('Password for user taro correct.\n', verify_message_1);

    // taro 1234を再度適用しても、.htpasswd内容が変化していないこと
    // (パスワードが同じなら、.htpasswdを変更しないこと)
    const content_1a = fs.readFileSync(htpasswd_path).toString();
    htpasswd.apply(user_1);
    const content_1b = fs.readFileSync(htpasswd_path).toString();
    assert.equal(content_1a, content_1b);

    // taroを削除した
    const user_2 = new UserEntity({
      username: 'taro',
      password: '1234',
      groups:   ['taro'],
      is_deleted:  true,
      comment: '',
    });
    htpasswd.apply(user_2);

    // taroはないはず
    const verify_message_2 = htpasswd_verify(htpasswd_path, 'taro', '1234');
    assert.equal('User taro not found\n', verify_message_2);
  });
});
