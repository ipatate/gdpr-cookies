import {h, Component} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from './Actions';
import Banner from './components/Banner/Banner';
import Modal from './components/Modal/Modal';

export class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.translate = this.translate.bind(this);
  }
  translate(string) {
    const {messages, locale} = this.props;
    if (messages === undefined || locale === undefined) return string;
    return messages[locale][string] || string;
  }
  render() {
    return (
      <div>
        <Modal t={this.translate} />
        <Banner t={this.translate} />
      </div>
    );
  }
}

export default connect(
  null,
  actions,
)(App);
