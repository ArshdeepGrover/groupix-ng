import { EDbModel } from 'src/app/enums/dbModel.enum';
import { IGroup } from 'src/app/models/group.model';
import { IRole } from 'src/app/models/role.model';
import { IUser } from 'src/app/models/user.model';

export interface IPopup {
  confirm: boolean;
  data: IData;
}

export interface IData {
  title: string;
  message: string;
  id: number;
  parentType: EDbModel;
  index: number;
  form_value: any;
  primary_button_text: string;
  currentUser: IUser;
  members: IRole[];
}
