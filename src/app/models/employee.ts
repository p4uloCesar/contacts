import {ModelBase} from './model-base';
import {User} from './user';

export class Employee extends ModelBase {
  public id: number;
  public name: string= null;
  public register: string= null;
  public situation: string= null;
  public user: User= new User();
  public departmentDescription: string= null;
  public signature: string;
  public user_obj: User;
  public email: string;
}
