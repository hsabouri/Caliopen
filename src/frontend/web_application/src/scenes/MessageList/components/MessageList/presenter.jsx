import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'lingui-react';
import { Button, MenuBar, Spinner } from '../../../../components';
import DayMessageList from '../DayMessageList';
import Message from '../Message';
import groupMessages from '../../services/groupMessages';
import { isMessageFromUser } from '../../../../services/message';
import { WithSettings } from '../../../../modules/settings';

import './style.scss';

class MessageList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    loadMore: PropTypes.node,
    onMessageRead: PropTypes.func.isRequired,
    onMessageUnread: PropTypes.func.isRequired,
    onMessageDelete: PropTypes.func.isRequired,
    onMessageReply: PropTypes.func.isRequired,
    onMessageCopyTo: PropTypes.func.isRequired,
    onForward: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    replyForm: PropTypes.node.isRequired,
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    isFetching: false,
    loadMore: null,
    onMessageView: null,
    user: undefined,
  };

  state = {
    anchor: '',
  }

  handleReplyToLastMessage = () => {
    const { messages, onMessageReply } = this.props;
    const message = messages[messages.length - 1];

    return onMessageReply({ message });
  };

  renderDayGroups(settings) {
    const {
      messages, onMessageRead, onMessageUnread, onMessageDelete, onMessageReply, onMessageCopyTo,
      user,
    } = this.props;

    const messagesGroupedByday = groupMessages(messages, user);

    return Object.keys(messagesGroupedByday)
      .map(date => (
        <DayMessageList key={date} date={date}>
          {messagesGroupedByday[date].map(message => (
            <Message
              key={message.message_id}
              message={message}
              settings={settings}
              isMessageFromUser={(user && isMessageFromUser(message, user)) || false}
              className="m-message-list__message"
              onMessageRead={onMessageRead}
              onMessageUnread={onMessageUnread}
              onDelete={onMessageDelete}
              onReply={onMessageReply}
              onCopyTo={onMessageCopyTo}
            />
          ))}
        </DayMessageList>
      ));
  }

  render() {
    const { messages, isFetching, loadMore, onDelete, replyForm } = this.props;

    return (
      <WithSettings render={settings => (
        <div className="m-message-list">
          <MenuBar>
            <Button className="m-message-list__action" onClick={this.handleReplyToLastMessage} icon="reply" responsive="icon-only" >
              <Trans id="message-list.action.reply">Reply</Trans>
            </Button>
            {/*
              <Button className="m-message-list__action" onClick={onForward} icon="share"
              responsive="icon-only" >
                <Trans id="message-list.action.copy-to">Copy to</Trans>
              </Button>
            */}
            <Button className="m-message-list__action" onClick={onDelete} icon="trash" responsive="icon-only" >
              <Trans id="message-list.action.delete">Delete</Trans>
            </Button>
            <Spinner isLoading={isFetching} className="m-message-list__spinner" />
          </MenuBar>
          { ((messages.length > 0 || !isFetching) && settings) && (
            <div>
              <div className="m-message-list__load-more">
                {loadMore}
              </div>
              <div className="m-message-list__list">
                {this.renderDayGroups(settings)}
              </div>
              <div className="m-message-list__reply">
                {replyForm}
              </div>
            </div>
          )}
        </div>
      )}
      />
    );
  }
}

export default MessageList;
