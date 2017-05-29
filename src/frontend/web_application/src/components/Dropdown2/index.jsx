import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import './style.scss';

function getPositions(dimensions, alignRight) {
  const trigger = dimensions.trigger;
  const content = dimensions.content;

  const alignRightOffset = trigger.width - content.width;
  const initTop = trigger.offset.top - content.offset.top;
  const initLeft = trigger.offset.left - content.offset.left;

  const positions = {
    top: {
      top: initTop - content.height,
      left: alignRight && initLeft + alignRightOffset > 0 ? initLeft + alignRightOffset : initLeft,
    },
    right: {
      top: initTop,
      left: initLeft + trigger.width,
    },
    bottom: {
      top: initTop + trigger.height,
      left: alignRight && initLeft + alignRightOffset > 0 ? initLeft + alignRightOffset : initLeft,
    },
    left: {
      top: initTop,
      left: initLeft - content.width,
    },
  };

  return positions;
}

function getDimensions(dropdown, dropdownContent, dropdownTrigger) {
  const content = dropdownContent.length ? dropdownContent[0] : dropdownContent;
  const trigger = dropdownTrigger.length ? dropdownTrigger[0] : dropdownTrigger;

  const dropdownRect = dropdown.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const triggerRect = trigger.getBoundingClientRect();
  const winY = window.pageYOffset;
  const winX = window.pageXOffset;
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;

  const dimensions = {
    dropdown: {
      width: dropdownRect.width,
      height: dropdownRect.height,
      offset: {
        top: dropdownRect.top + winY,
        left: dropdownRect.left + winX,
      },
    },
    trigger: {
      width: triggerRect.width,
      height: triggerRect.height,
      offset: {
        top: triggerRect.top + winY,
        left: triggerRect.left + winX,
      },
    },
    content: {
      width: contentRect.width,
      height: contentRect.height,
      offset: {
        top: contentRect.top + winY,
        left: contentRect.left + winX,
      },
    },
    window: {
      width: winWidth,
      height: winHeight,
      offset: {
        top: winY,
        left: winX,
      },
    },
  };

  return dimensions;
}


class Dropdown2 extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    alignRight: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    controller: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    position: 'bottom',
    alignRight: false,
    className: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dimensions: {
        trigger: {
          width: 0,
          height: 0,
          offset: {
            top: 0,
            left: 0,
          },
        },
        content: {
          width: 0,
          height: 0,
          offset: {
            top: 0,
            left: 0,
          },
        },
        window: {
          width: 0,
          height: 0,
          offset: {
            top: 0,
            left: 0,
          },
        },
      },
      positions: {
        top: {
          top: 0,
          left: 0,
        },
        right: {
          top: 0,
          left: 0,
        },
        bottom: {
          top: 0,
          left: 0,
        },
        left: {
          top: 0,
          left: 0,
        },
      },
    };
    this.toggle = this.toggle.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.dimensionsToState = this.dimensionsToState.bind(this);
  }

  componentDidMount() {
    this.dimensionsToState();
  }

  dimensionsToState() {
    const dropdownContent = this.dropdownContent;
    const dropdownTrigger = this.dropdownTrigger;
    const dropdown = this.dropdown;
    const dimensions = getDimensions(dropdown, dropdownContent, dropdownTrigger);

    this.setState({
      dimensions,
    });
  }

  expand() {
    this.setState({
      isOpen: true,
    });
  }

  collapse() {
    this.setState({
      isOpen: false,
    });
  }

  toggle(ev) {
    ev.preventDefault();
    const positions = getPositions(this.state.dimensions, this.props.alignRight);

    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      positions,
    }));
  }

  render() {
    const { id, children, className, controller, position } = this.props;
    const { isOpen, positions } = this.state;
    const contentPosition = positions[position];

    const triggerProps = {
      className: 'm-dropdown2__trigger',
      onClick: this.toggle,
      'data-toggle': id,
      'aria-expanded': isOpen,
      'aria-hidden': !isOpen,
    };

    const contentStyles = {
      left: contentPosition.left < 0 || contentPosition.top < 0 ? positions.bottom.left : positions[position].left,
      top: contentPosition.left < 0 || contentPosition.top < 0 ? positions.bottom.top : positions[position].top,
    };

    return (
      <div
        className={classnames('m-dropdown2', className)}
        tabIndex="0"
        onBlur={this.collapse}
        ref={(dropdown) => this.dropdown = dropdown} // eslint-disable-line
      >

        <div
          ref={(dropdownTrigger) => this.dropdownTrigger = dropdownTrigger} // eslint-disable-line
          {...triggerProps}
        >
          <Button
            shape="plain"
          >{controller}</Button></div>

        <div
          id={id}
          className={classnames('m-dropdown2__content', { 'm-dropdown2__content--is-open': isOpen })}
          style={contentStyles}
          ref={(dropdownContent) => this.dropdownContent = dropdownContent} // eslint-disable-line
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown2;
