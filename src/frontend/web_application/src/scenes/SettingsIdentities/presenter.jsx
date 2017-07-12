import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingsIdentities extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { __ } = this.props;

    return (
      <div className="s-settings-identities">
        {__('settings.identities')}
      </div>
    );
  }
}

export default SettingsIdentities;
