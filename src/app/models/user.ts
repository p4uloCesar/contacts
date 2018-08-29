import {ModelBase} from './model-base';
import {Group} from "./group";

export class User extends ModelBase {
  public register: string;
  public email: string;
  public password: string;
  public group_list: Group[]=[];
  public groups: number[]=[];
  public employee: any;
  public login: string;
}
