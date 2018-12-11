import Gdpr from '../src/services/Gdpr';

declare type OptionsGdpr = {
  name?: string,
  keepCookies?: Array<string>,
  types?: Array<string>,
  expires?: number,
};

declare type ServiceDescription = {
  name: string,
  type: string,
  description?: string,
};

declare type ServiceGlobal = [ServiceDescription, Function];

declare type ObserverGdpr = Array<ServiceGlobal>;

declare type ObservableGdpr = Map<string, Set<Function>>;

declare type Service = {
  name: string,
  type: string,
  description?: string,
  state: boolean,
};

declare type ServiceList = Array<Service>;

declare type StoreType = {
  gdpr: Gdpr,
  showModal: boolean,
  locale: string,
  messages: Object,
  prevListService: ServiceList,
  listService: ServiceList,
  isFirstVisit: boolean,
};

declare type AppProps = {
  t: Function,
  store: Object,
  showModal: boolean,
  showBanner: boolean,
  listService: ServiceList,
  isFirstVisit: boolean,
  toggleModal: Function,
  toggleBanner: Function,
  toggleServiceByType: Function,
  saveStateInGdpr: Function,
  toggleAllService: Function,
};
