import React from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidV1 } from 'uuid';
import classnames from 'classnames';
import Icon from '../../Icon';
import { FieldErrors } from '..';
import './style.scss';

const InputFileGroup = ({ id, label, errors, multiple, className, ...inputProps }) => (
  <div className={classnames('m-input-file-group', className)}>
    <label htmlFor={id} className="m-input-file-group__label">
      <span className="m-input-file-group__label-button"><Icon type="plus" /></span>
      <span className="m-input-file-group__label-text">{label}</span>
      <span className="m-input-file-group__label-icon"><Icon type="folder" /></span>
      <input
        id={id}
        type="file"
        name={id}
        className="m-input-file-group__input"
        multiple={multiple}
        {...inputProps}
      />
    </label>
    { errors &&
      <FieldErrors errors={errors} />
    }
  </div>
);

InputFileGroup.defaultProps = {
  errors: null,
  className: null,
  id: uuidV1(),
  multiple: false,
};

InputFileGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InputFileGroup;
