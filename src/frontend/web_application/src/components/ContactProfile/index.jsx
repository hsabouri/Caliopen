import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withTranslator } from '@gandi/react-translate';
import Badge from '../Badge';
import MultidimensionalPi from '../../components/MultidimensionalPi';
import ContactAvatarLetter from '../ContactAvatarLetter';
import { formatName } from '../../services/contact';
import './style.scss';

const FAKE_TAGS = ['Caliopen', 'Gandi', 'Macarons'];

@withTranslator()
class ContactProfile extends Component {
  static propTypes = {
    contact: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
    editMode: PropTypes.bool.isRequired,
    form: PropTypes.node.isRequired,
    contactDisplayFormat: PropTypes.string.isRequired,
  };
  static defaultProps = {
    className: undefined,
  };

  render() {
    const { contact, contactDisplayFormat: format, className, editMode, form } = this.props;

    return (
      <div className={classnames('m-contact-profile', className)}>
        <div className="m-contact-profile__header">
          <div className="m-contact-profile__avatar-wrapper">
            <ContactAvatarLetter
              contact={contact}
              contactDisplayFormat={format}
              className="m-contact-profile__avatar"
            />
          </div>

          {!editMode && (
            <h3 className="m-contact-profile__name">{formatName({ contact, format })}</h3>
          )}
        </div>

        {editMode && form }

        {// contact.tags &&
          // FIXME: contact.tags replaced with FAKE_TAGS for testing purpose
          <div className="m-contact-profile__tags">
            {FAKE_TAGS.map(tag => (
              <Badge className="m-contact-profile__tag" key={tag}>{tag}</Badge>
            ))}
          </div>
        }

        {contact.pi && !editMode && (

        // FIXME: on mobile, MultidimensionalPi should be displayed on
        // 2 columns (graph on left, rates on right)

          <MultidimensionalPi className="m-contact-profile__pi" pi={contact.pi} />
        )}
      </div>
    );
  }
}

export default ContactProfile;
