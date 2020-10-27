import { IResponseCommon } from '../model-data/response-common';
import { IGroup } from '../model-data/group.model';

export interface IGroupResponse extends IResponseCommon {
  groups: IGroup[];
}
