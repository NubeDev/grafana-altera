import api from './index';
import { SERVER_API } from 'shared/constants/server-api.constants';
import { IGroupResponse } from 'shared/models/model-responses/group-response';

const actions = {
  getGroups(query: object) {
    const config = {
      params: query
    }
    return api.get(SERVER_API.ALE_FETCH_GROUPS, config)
  }
}

export default {

  getGroups() {
    return actions.getGroups({})
      .then((res: IGroupResponse) => {
        return {
          groups: res.groups
        };
      })
      // tslint:disable-next-line: no-console
      .catch(error => console.log(error));
  },
}
