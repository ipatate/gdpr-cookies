// @flow @jsx h
import {h, Component} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from './Store/Actions';
import Banner from './components/Banner';
import Modal from './components/Modal';

type initProps = {
  messages: Object,
  locale: string,
};
export class App extends Component<initProps> {
  translate = (string: string) => {
    const {messages, locale} = this.props;
    if (
      messages === undefined ||
      locale === undefined ||
      messages[locale] === undefined
    )
      return string;
    return messages[locale][string] || string;
  };

  render() {
    return (
      <div>
        <Modal t={this.translate} />
        <Banner t={this.translate} />
      </div>
    );
  }
}

const mapToProps = ({locale, messages}) => ({locale, messages});

export default connect(
  mapToProps,
  actions,
)(App);
