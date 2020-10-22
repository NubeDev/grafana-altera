export interface INote {
  attributes: INoteAttributes;
  createTime: any;
  customer: any;
  href: string;
  id: string;
  related: IRelated;
  text: string;
  type: string;
  updateTime: any;
  user: any;
}

interface INoteAttributes {
  environment?: string;
  event?: string;
  resource?: string;
  severity?: string;
  status?: string;
}

interface IRelated {
  alert: string;
}
