import fs from 'fs';
import csvParse from 'csv-parse/lib/sync';
import UserEntity from './UserEntity';

export default class UserModel {
  public static csvRead(path:string): Array<UserEntity > {
    const content = fs.readFileSync(path).toString();
    return this.csvParse(content);
  }

  public static csvParse(content:string): Array<UserEntity> {
    const value_arr_arr:Array<Array<string>> = csvParse(content);
    if (value_arr_arr.length === 0) {
      throw new Error('csv is empty');
    }

    const user_arr:Array<UserEntity> = [];

    const name_arr:Array<string> = value_arr_arr.shift();

    value_arr_arr.forEach((value_arr:Array<string>) => {
      const user = this.createUserEntity(name_arr, value_arr);
      user_arr.push(user);
    });

    return user_arr;
  }

  public static createUserEntity(name_arr:Array<string>, value_arr:Array<string>): UserEntity {
    const vars:any = {};

    name_arr.forEach((name:string, index:number) => {
      let value = '';
      if (index < value_arr.length) {
        value = value_arr[index];
      }

      if (name === 'groups') {
        vars[name] = this.parseGroups(value);
      } else if (name === 'is_deleted') {
        vars[name] = this.parseIsDeleted(value);
      } else {
        vars[name] = value;
      }
    });

    const user = new UserEntity(vars);
    return user;
  }

  public static parseGroups(value:string): Array<string> {
    let arr:Array<string> = [];

    const arr_arr = csvParse(value);
    if (arr_arr.length > 0) {
      arr = arr_arr.shift();
    }

    return arr;
  }

  public static parseIsDeleted(value:string): boolean {
    return !!value;
  }
}
