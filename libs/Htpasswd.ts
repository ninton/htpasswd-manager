/* eslint no-unused-vars:0 */
import fs from 'fs';
import UserEntity from './UserEntity';

import child_process = require('child_process');

export default class Htpasswd {
  private path:string;

  public constructor(path:string) {
    this.path = path;
  }

  public apply(user:UserEntity) {
    if (user.is_deleted) {
      this.delete(user);
      this.isVerified(user);
      return;
    }

    if (this.isVerified(user)) {
      return;
    }

    this.update(user);
  }

  public isVerified(user:UserEntity): boolean {
    if (!fs.existsSync(this.path)) {
      return false;
    }

    const args = [
      '-vb',
      this.path,
      user.username,
      user.password,
    ];
    const result = child_process.spawnSync('htpasswd', args);
    const isVerified = result.stderr.toString().search('correct.') >= 0;

    return isVerified;
  }

  public update(user:UserEntity): any {
    let opt:string;
    if (fs.existsSync(this.path)) {
      opt = '-b';
    } else {
      opt = '-cb';
    }

    const args = [
      opt,
      this.path,
      user.username,
      user.password,
    ];

    return child_process.spawnSync('htpasswd', args);
  }

  public delete(user:UserEntity): any {
    const args = [
      '-D',
      this.path,
      user.username,
    ];

    return child_process.spawnSync('htpasswd', args);
  }
}
