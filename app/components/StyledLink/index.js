/**
 *
 * StyledLink
 *
 */

import { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const StyledLink = styled(Link).attrs({
  className: 'mr-1 text-truncate',
})`
  color: #fff;

  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;

StyledLink.propTypes = {};

export default memo(StyledLink);
