/* eslint no-unused-vars:0 */
import fs from 'fs';
import path from 'path';
import UserModel from './UserModel';
import UserEntity from './UserEntity';
import GroupModel from './GroupModel';

export default class HtgroupManager {
  private args:any;

  public constructor(argv:Array<string>) {
    this.args = this.parseArgv(process.argv);
  }

  public parseArgv(argv:Array<string>): any {
    if (argv.length < 4) {
      throw new Error('few argment');
    }

    const user_passwd_json_path = process.argv[2];
    if (!fs.existsSync(user_passwd_json_path)) {
      throw new Error(`${user_passwd_json_path} not exists.`);
    }

    const htgroup_path = process.argv[3];
    const dir_htpasswd = path.dirname(htgroup_path);
    if (!fs.existsSync(dir_htpasswd)) {
      throw new Error(`${dir_htpasswd} not exists.`);
    }

    return {
      user_passwd_json_path,
      htgroup_path,
    };
  }

  public run(): void {
    const user_arr:UserEntity[] = UserModel.csvRead(this.args.user_passwd_json_path);
    const groupModel = new GroupModel();
    groupModel.read(this.args.htgroup_path);

    user_arr.forEach((user:UserEntity) => {
      groupModel.apply(user);
    });

    groupModel.write(this.args.htgroup_path);
  }
}
