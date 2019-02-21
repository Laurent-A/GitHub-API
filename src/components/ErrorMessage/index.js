import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.scss';

const ErrorMessage = ({ message }) => (
  <div id="error-message">
    <Message negative>
      <Message.Header>Oups, désolé</Message.Header>
      <p>{message}</p>
    </Message>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
