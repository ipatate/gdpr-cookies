// @flow
const actions = () => ({
  toggleBanner: (state: StoreType, payload: boolean) => ({
    isFirstVisit: payload,
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
    const {gdpr, listService, isFirstVisit} = state;
    // update activated in gdpr class
    listService.forEach((value: Service) => {
      gdpr.updateServiceByName(value.name, value.state);
    });
    // clear all cookie
    gdpr.clearCookies();
    // save new state of service in cookie
    gdpr.updateCookie();
    // if fist visit not reload
    if (isFirstVisit === true) {
      gdpr.toggleService();
    } else {
      window.location.reload();
    }
    return {listService: gdpr.getListServices()};
  },
});

export default actions;
