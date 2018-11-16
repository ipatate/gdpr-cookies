declare type OptionsGrpd = {
  name: string,
  keepCookies?: Array<string>,
  types?: Array<string>,
};

declare type ObserverGrpd = Array<[string, string, Function]>;

declare type ObservableGrpd = {
  [string]: Array<Function>,
};
