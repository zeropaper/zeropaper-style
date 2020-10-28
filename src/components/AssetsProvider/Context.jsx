import React from 'react';

export const AssetsContext = React.createContext({
  assets: [],
  getFluid: () => { },
  findSize: () => { },
});

export const useAssets = () => React.useContext(AssetsContext);
