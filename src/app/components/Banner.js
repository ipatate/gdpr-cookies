import {h, Component} from 'preact';

export default class Banner extends Component {
  render() {
    return <div>{this.props.t('alert_text')}</div>;
  }
}
