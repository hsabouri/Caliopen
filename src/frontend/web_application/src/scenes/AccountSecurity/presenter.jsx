import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountOpenPGPKeys from './components/AccountOpenPGPKeys';


class AccountSecurity extends Component {
  static propTypes = {
    // __: PropTypes.func.isRequired,
    requestUser: PropTypes.func.isRequired,
    user: PropTypes.shape({}),
  };
  static defaultProps = {
    user: undefined,
  };

  componentDidMount() {
    this.props.requestUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="s-account-security">
        <AccountOpenPGPKeys user={user} />
      </div>
    );
  }
}

export default AccountSecurity;
