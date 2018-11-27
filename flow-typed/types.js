declare type OptionsGdpr = {
  name: string,
  keepCookies?: Array<string>,
  types?: Array<string>,
};

declare type ServiceDescription = {
  name: string,
  type: string,
  description?: string,
};

declare type ServiceGlobal = [ServiceDescription, Function];

declare type ObserverGdpr = Array<ServiceGlobal>;

declare type ObservableGdpr = Map<string, Set<Function>>;

declare type ServiceList = Array<{
  name: string,
  type: string,
  description?: string,
  state: boolean,
}>;
