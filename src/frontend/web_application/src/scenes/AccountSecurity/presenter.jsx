import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountSecurity extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
    requestUser: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired,
    onRemoteIdentityChange: PropTypes.func.isRequired,
    user: PropTypes.shape({}),
    isFetching: PropTypes.bool,
  };
  static defaultProps = {
    user: undefined,
    isFetching: false,
  };

  state = {};

  render() {
    // const { user } = this.props;

    return (
      <div className="s-account__openpgp" />
    );
  }
}

export default AccountSecurity;
