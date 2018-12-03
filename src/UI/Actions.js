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
});

export default actions;
