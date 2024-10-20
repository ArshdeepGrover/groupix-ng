import { IRole } from 'src/app/models/role.model';
import { IGroupMembers } from './group-members.model';
import { IUser } from './user.model';

export interface IGroup {
  id: number;
  name: string;
  creator: IUser;
  creator_id: number;
  deleted_at: any;
  archived_at: any;
  created_at: string;
  updated_at: string;
  admin_members_count: number;
  admin: IRole[];
  members: IRole[];
}
