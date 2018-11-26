declare type OptionsGdpr = {
  name: string,
  keepCookies?: Array<string>,
  types?: Array<string>,
};

declare type ServiceDescription = {
  name: string,
  type: string,
  desc?: string,
};

declare type ServiceGlobal = [ServiceDescription, Function];

declare type ObserverGdpr = Array<ServiceGlobal>;

declare type ObservableGdpr = Map<string, Set<Function>>;
