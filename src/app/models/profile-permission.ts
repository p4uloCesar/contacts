import {ModelBase} from './model-base';
import {Profile} from './profile';

export class ProfilePermission extends ModelBase {
  public module: string;
  public profile: string;
  public create: boolean;
  public visualization: boolean;
  public delete: boolean;
  public edit: boolean;
  public profile_obj: Profile;

}
