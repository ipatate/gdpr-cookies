declare type OptionsGdpr = {
  name: string,
  keepCookies?: Array<string>,
  types?: Array<string>,
};

declare type ObserverGdpr = Array<[string, string, Function]>;

declare type ObservableGdpr = Map<string, Set<Function>>;
