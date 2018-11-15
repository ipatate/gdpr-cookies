declare type OptionsGrpd = {
  name?: string,
  keepCookies?: Array<string>,
  types?: Array<string>,
};

declare type CookieObject = {
  getAll: Function,
  get: Function,
  set: Function,
  remove: Function,
};
