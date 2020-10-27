import { IResponseCommon } from '../model-data/response-common';
import { IEnvironment } from '../model-data/environment.model';

export interface IEnvironmentResponse extends IResponseCommon {
  environments: IEnvironment[];
}
