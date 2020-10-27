import api from './index';
import { IGroupResponse } from 'shared/models/model-responses/group-response';

const actions = {
  getGroups(query: object) {
    const config = {
      params: query
    };
    return api.get('/api/alerts/groups', config);
  }
}

export default {

  getGroups() {
    return actions.getGroups({})
      .then((res: IGroupResponse) => {
        return {
          groups: res.groups
        };
      });
  },
}
