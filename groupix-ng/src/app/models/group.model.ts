import {IGroupMembers} from "./group-members.model";
import {IUser} from "./user.model";

export interface IGroup {
  id: number;
  name: string;
  group_members: IGroupMembers[];
  creator: IUser;
  creator_id: number;
  deleted_at: any;
  archived_at: any;
  created_at: string;
  updated_at: string;
  members_count: number;
}


