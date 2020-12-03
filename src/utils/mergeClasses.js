// borrowed from Material UI
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui-styles/src/mergeClasses/mergeClasses.js

const getDisplayName = (Comp) => (
  Comp.displayName
  || Comp.name
  || 'Unknown'
);

export default function mergeClasses(options = {}) {
  const { baseClasses, newClasses, Component } = options;

  if (!newClasses) {
    return baseClasses;
  }

  const nextClasses = { ...baseClasses };

  if (process.env.NODE_ENV !== 'production') {
    if (typeof newClasses === 'string') {
      console.error(
        [
          `The value \`${newClasses}\` `
          + `provided to the classes prop of ${getDisplayName(Component)} is incorrect.`,
          'You might want to use the className prop instead.',
        ].join('\n'),
      );

      return baseClasses;
    }
  }

  Object.keys(newClasses).forEach((key) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!baseClasses[key] && newClasses[key]) {
        console.error(
          [
            `The key \`${key}\` `
            + `provided to the classes prop is not implemented in ${getDisplayName(Component)}.`,
            `You can only override one of the following: ${Object.keys(baseClasses).join(',')}.`,
          ].join('\n'),
        );
      }

      if (newClasses[key] && typeof newClasses[key] !== 'string') {
        console.error(
          [
            `The key \`${key}\` `
            + `provided to the classes prop is not valid for ${getDisplayName(Component)}.`,
            `You need to provide a non empty string instead of: ${newClasses[key]}.`,
          ].join('\n'),
        );
      }
    }

    if (newClasses[key]) {
      nextClasses[key] = `${baseClasses[key]} ${newClasses[key]}`;
    }
  });

  return nextClasses;
}
