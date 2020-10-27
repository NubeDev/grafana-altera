import { IResponseCommon } from '../model-data/response-common';
import { IService } from '../model-data/service.model';

export interface IServiceResponse extends IResponseCommon {
  services: IService[];
}
