// @flow @jsx h
import {h} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from './Store/Actions';
import Banner from './components/Banner';
import Modal from './components/Modal';

type initProps = {
  messages: Object,
  locale: string,
};
const App = ({messages, locale}: initProps) => {
  const t = (string: string) => {
    if (
      messages === undefined ||
      locale === undefined ||
      messages[locale] === undefined
    )
      return string;
    return messages[locale][string] || string;
  };

  return (
    <div>
      <Modal t={t} />
      <Banner t={t} />
    </div>
  );
};

const mapToProps = ({locale, messages}) => ({locale, messages});

export default connect(mapToProps, actions)(App);
