import {IGroup} from "./group";
import {IUser} from "./user.model";

export interface IGroupMembers {
  id: number;
  group: IGroup;
  member: IUser
}
