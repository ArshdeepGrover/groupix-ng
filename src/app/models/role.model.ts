import { IUser } from 'src/app/models/user.model';

export interface IRole {
  id: number;
  user: IUser;
  role_type_name: string;
  created_at: Date;
}
