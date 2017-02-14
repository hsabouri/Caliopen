import React, { Component, PropTypes } from 'react';
import Button from '../../../Button';
import Icon from '../../../Icon';
import { TextFieldGroup, FormGrid } from '../../../form';

import './style.scss';

class TagItem extends Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      edit: !prevState.edit,
    }));
  }

  renderForm(tag) {
    return (
      <FormGrid className="m-tag">
        <TextFieldGroup
          id={tag}
          name={tag}
          className="m-tag__input"
          label={tag}
          placeholder={tag}
          defaultValue={tag}
          showLabelforSr
          autoFocus
        />
        <Button inline onClick={this.handleClick}><Icon type="check" /></Button>
      </FormGrid>
    );
  }

  renderButton(tag) {
    return (
      <FormGrid className="m-tag">
        <Button
          className="m-tag__button"
          onClick={this.handleClick}
          expanded
        >
          <span className="m-tag__text">{tag}</span>
          <Icon className="m-tag__icon" type="edit" />
        </Button>
      </FormGrid>
    );
  }

  render() {
    return (
      this.state.edit ?
        this.renderForm(this.props.tag)
      :
        this.renderButton(this.props.tag)
    );
  }
}

export default TagItem;
