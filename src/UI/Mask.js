// @flow @jsx h
// import actions from './Actions';
import {h, render} from 'preact';
import {Provider} from 'redux-zero/preact';
import Mask from './components/Mask';

export const createMask = (store: Object) => {
  let maskElement = document.getElementsByClassName('gdpr-mask');
  maskElement = Array.from(maskElement);
  const {listService, isFirstVisit} = store.getState();
  maskElement.forEach(element => {
    if (element !== undefined) {
      const name = element.dataset.gdpr;
      const service = listService.find(
        serviceState => serviceState.name === name,
      );
      if (service && (service.state === false || isFirstVisit === true)) {
        render(
          <Provider store={store}>
            <Mask service={service} />
          </Provider>,
          element,
        );
      }
    }
  });
};
