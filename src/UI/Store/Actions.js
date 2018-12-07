// @flow
const actions = () => ({
  toggleBanner: (state: StoreType, payload: boolean) => ({
    showBanner: payload,
  }),
  toggleModal: (state: StoreType, payload: boolean) => ({showModal: payload}),
  toggleServiceByName: (
    state: StoreType,
    payload: {name: string, state: boolean},
  ) => {
    const listService: ServiceList = state.listService.map(
      (value: Service): Service => {
        if (value.name === payload.name) {
          value.state = payload.state;
        }
        return value;
      },
    );
    return {listService};
  },
  toggleServiceByType: (
    state: StoreType,
    payload: {type: string, state: boolean},
  ) => {
    const listService: ServiceList = state.listService.map(
      (value: Service): Service => {
        if (value.type === payload.type) {
          value.state = payload.state;
        }
        return value;
      },
    );
    return {listService};
  },
  saveStateInGdpr: (state: StoreType) => {
    const {gdpr, listService, isFirstVisit, prevListService} = state;
    // update activated in gdpr class
    listService.forEach((value: Service) => {
      gdpr.updateServiceByName(value.name, value.state);
    });
    // clear all cookie
    gdpr.clearCookies();
    // save new state of service in cookie
    gdpr.updateCookie();
    // if state pass to true to false in service => reload page for delete cookie
    const reload = reloadIsNeeded(prevListService, listService);
    // if fist visit, not reload because cookie not exist
    if (reload === true && isFirstVisit === false) {
      window.location.reload();
    } else {
      gdpr.toggleService(prevListService, isFirstVisit);
    }
    return {
      isFirstVisit: false,
      listService: gdpr.getListServices(),
      prevListService: gdpr.getListServices(),
    };
  },
});

export const reloadIsNeeded = (
  oldState: ServiceList,
  newState: ServiceList,
): boolean => {
  let result = false;
  newState.forEach(service => {
    const {name, state} = service;
    const old = oldState.find(service => service.name === name);
    if (old !== undefined && old.state === true && state === false) {
      result = true;
    }
  });
  return result;
};

export default actions;
