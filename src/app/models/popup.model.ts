import { EDbModel } from "src/app/enums/dbModel.enum";

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
}
