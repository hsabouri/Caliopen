import React from 'react';
import PropTypes from 'prop-types';
import NavList, { ItemContent } from '../../components/NavList';
import MenuBar from '../../components/MenuBar';
import Link from '../../components/Link';

import './style.scss';

const Account = ({ __, children }) => {
  const navLinks = [
    { title: __('account.profile'), to: '/account/profile', active: false },
    { title: __('account.privacy'), to: '/account/privacy', active: false },
    { title: __('account.security'), to: '/account/security', active: false },
  ];

  return (
    <div className="l-account">
      <MenuBar>
        <NavList>
          {navLinks.map(link => (
            <ItemContent active={link.active} large key={link.title}>
              <Link noDecoration {...link}>{link.title}</Link>
            </ItemContent>
          ))}
        </NavList>
      </MenuBar>
      <div className="l-settings__panel">{children}</div>
    </div>
  );
};

Account.propTypes = {
  children: PropTypes.node,
  __: PropTypes.func.isRequired,
};

Account.defaultProps = {
  children: null,
};

export default Account;
