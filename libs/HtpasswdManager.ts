/* eslint no-unused-vars:0 */
import fs from 'fs';
import path from 'path';
import UserModel from './UserModel';
import UserEntity from './UserEntity';
import Htpasswd from './Htpasswd';

export default class HtpasswdManager {
  private args:any;

  public constructor(argv:Array<string>) {
    this.args = this.parseArgv(process.argv);
  }

  public parseArgv(argv:Array<string>): any {
    if (argv.length < 4) {
      throw new Error('few argment');
    }

    const user_csv_path = process.argv[2];
    if (!fs.existsSync(user_csv_path)) {
      throw new Error(`${user_csv_path} not exists.`);
    }

    const htpasswd_path = process.argv[3];
    const dir_htpasswd = path.dirname(htpasswd_path);
    if (!fs.existsSync(dir_htpasswd)) {
      throw new Error(`${dir_htpasswd} not exists.`);
    }

    return {
      user_csv_path,
      htpasswd_path,
    };
  }

  public run(): void {
    const user_arr:UserEntity[] = UserModel.csvRead(this.args.user_csv_path);
    const htpasswd = new Htpasswd(this.args.htpasswd_path);

    user_arr.forEach((user:UserEntity) => {
      htpasswd.apply(user);
    });
  }
}
