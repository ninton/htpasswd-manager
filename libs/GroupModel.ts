/* eslint no-unused-vars:0 */
import fs from 'fs';
import UserEntity from './UserEntity';

export default class GroupModel {
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

  private user_map:any = {};

  public apply(user:UserEntity) {
    if (user.is_deleted) {
      this.delete(user.username, user.groups);
    } else {
      this.add(user.username, user.groups);
    }
  }

  public read(path:string) {
    let content = '';

    if (fs.existsSync(path)) {
      content = fs.readFileSync(path).toString();
    }

    this.parse(content);
  }

  public write(path:string) {
    const data = this.toString();
    fs.writeFileSync(path, data);
  }

  public delete(username:string, group_arr:Array<string>) {
    group_arr.forEach((groupname) => {
      delete (this.user_map[username][groupname]);
    });
  }

  public exists(username:string, groupname:string): boolean {
    if (username in this.user_map) {
      if (groupname in this.user_map[username]) {
        return true;
      }
    }

    return false;
  }

  public add(username:string, group_arr:Array<string>) {
    if (!(username in this.user_map)) {
      this.user_map[username] = {};
    }

    group_arr.forEach((groupname) => {
      this.user_map[username][groupname] = true;
    });
  }

  public toString() {
    const group_map:any = this.flip(this.user_map);

    const groupname_arr = Object.keys(group_map).sort();
    const s_arr:string[] = groupname_arr.map((groupname):string => {
      const username_arr = Object.keys(group_map[groupname]).sort();
      const s = `${groupname}: ${username_arr.join(' ')}\n`;
      return s;
    });

    return s_arr.join('');
  }

  public flip(user_map:any): any {
    const group_map:any = {};

    Object.keys(user_map).forEach((username:string) => {
      Object.keys(user_map[username]).forEach((groupname:string) => {
        if (!(groupname in group_map)) {
          group_map[groupname] = {};
        }
        group_map[groupname][username] = true;
      });
    });

    return group_map;
  }

  public parse(content:string) {
    const line_arr = content.split(/\n/);

    line_arr.forEach((line:string) => {
      if (line.trim() === '') {
        return;
      }

      const arr = line.split(':');
      const groupname = arr[0];
      const username_arr = arr[1].split(' ');
      username_arr.forEach((username:string) => {
        if (username.length === 0) {
          return;
        }

        this.add(username, [groupname]);
      });
    });
  }
}
