/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// eslint-disable-next-line react/prop-types
const Centering = ({ children }) => (
  <div
    style={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        display: 'block',
        maxWidth: 450,
        minWidth: 250,
      }}
    >
      {children}
    </div>
  </div>
);

// eslint-disable-next-line react/display-name
export default (Comp) => (props) => (
  <Centering><Comp {...props} /></Centering>
);
