import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import useResize from '../../hooks/useResize';

import { AssetsContext, useAssets } from './Context';

const findSize = (sizes, size) => {
  const keys = Object.keys(sizes || {});
  const srcKey = keys.find((key, k) => {
    const sideSize = parseInt(key, 10);
    const side = key[key.length - 1] !== 'w' ? 'height' : 'width';
    return sideSize > size[side] && keys[k - 1];
  });
  return sizes?.[srcKey];
};

const parseSrcSet = (srcSet) => srcSet
  ?.split(',')
  .map((s) => s.trim())
  .reduce((acc, val) => {
    const [src, sizeStr] = val.split(' ');
    return {
      ...acc,
      [sizeStr]: src,
    };
  }, {});

const normalizeData = ({
  allFile: { nodes = [] } = {},
}) => nodes.reduce((obj, {
  childImageSharp: {
    fluid: { srcSet: fluidSet = null } = {},
    fixed: { srcSet: fixedSet = null } = {},
  } = {},
  name,
  ...rest
} = {}) => ({
  ...obj,
  [name]: {
    ...rest,
    name,
    fluid: {
      set: fluidSet,
      sizes: parseSrcSet(fluidSet),
    },
    fixed: {
      set: fixedSet,
      sizes: parseSrcSet(fixedSet),
    },
  },
}), {});

export {
  useAssets,
  normalizeData,
  parseSrcSet,
  findSize,
};

// eslint-disable-next-line react/prop-types
const AssetsProvider = ({ children }) => {
  const windowSize = useResize();
  const data = normalizeData(useStaticQuery(graphql`{
    allFile(filter: {extension: {eq: "png"}}) {
      nodes {
        name
        publicURL
        childImageSharp {
          fluid {
            src
            srcSet
            aspectRatio
            presentationWidth
            presentationHeight
          }
          fixed {
            src
            srcSet
            aspectRatio
          }
        }
      }
    }
  }`));

  const ctx = {
    assets: data,
    findSize,
    getFluid: (name, size = windowSize) => findSize(data[name]?.fluid?.sizes, size),
    getFixed: (name, size = windowSize) => findSize(data[name]?.fixed?.sizes, size),
  };

  // console.info('AssetsProvider data', ctx);

  return (
    <AssetsContext.Provider value={ctx}>
      {children}
    </AssetsContext.Provider>
  );
};

export default AssetsProvider;
