export default class UserEntity {
    username:string = '';
    password:string = '';
    groups:string[] = [];
    is_deleted:boolean = false;
    comment:string = '';

    public constructor(vars:any = undefined) {
      if (vars === undefined) {
        return;
      }

      this.username = vars.username;
      this.password = vars.password;
      this.groups = vars.groups;
      this.is_deleted = vars.is_deleted;
      this.comment = vars.comment;
    }
}
