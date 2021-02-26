import React from 'react';
import StyledLink from 'components/StyledLink';

import PropTypes from 'prop-types';

/**
 *
 * @param asset
 * @param state
 * @returns {*}
 * @constructor
 */
export default function AssetLink({ asset, children, basepath }) {
  const basepathUrl = basepath || '/asset';
  const isBTC = asset === 0;
  const link = asset || isBTC ? (
    <StyledLink to={`${basepathUrl}/${asset}`}>
      {children}
    </StyledLink>
  ) : (
    <div>
      {children}
    </div>
  );
  
  return link;
}

AssetLink.propTypes = {
  asset: PropTypes.number,
  children: PropTypes.any,
  basepath: PropTypes.string,
};
