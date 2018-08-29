import {ModelBase} from './model-base';
import {Profile} from './profile';
import {Permission} from './permission';

export class Group extends ModelBase {
  name: string;
  profile_obj: Profile;
  permissions: number[] = [];
  permission_list: Permission[] = [];
}
