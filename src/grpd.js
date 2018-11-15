// @flow
import merge from 'deepmerge';

class Grpd {
  options: OptionsGrpd = {
    keepCookies: ['plop'],
  };

  constructor(options: ?OptionsGrpd = {}) {
    this.options = merge.all([this.options, options]);
  }
}

export default Grpd;
