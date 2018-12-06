// @flow @jsx h
// import actions from './Actions';
import {h, render} from 'preact';
import {Provider} from 'redux-zero/preact';
import Mask from './components/Mask';

export const createMask = (store: Object) => {
  const maskElement = document.getElementsByClassName('gdpr-mask');
  const {listService} = store.getState();
  for (const key in maskElement) {
    const element = maskElement[+key];
    if (element !== undefined) {
      const name = element.dataset.gdpr;
      const service = listService.find(
        serviceState => serviceState.name === name,
      );
      if (service && service.state === false) {
        render(
          <Provider store={store}>
            <Mask service={service} />
          </Provider>,
          element,
        );
      }
    }
  }
};
