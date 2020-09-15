import { ResponseCommon } from '../model-data/response-common';
import { IEnvironment } from '../model-data/environment.model';

export interface IEnvironmentResponse extends ResponseCommon {
  environments: IEnvironment[];
}
