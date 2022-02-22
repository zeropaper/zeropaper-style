import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: ({ focused }) => ({
    cursor: 'pointer',
    display: 'inline-block',
    borderRadius: 1000,
    backgroundColor: 'lime',
    outline: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: focused ? 'red' : 'currentColor',
  }),
  checkbox: {
    display: 'none',
  },
  dot: ({ checked }) => ({
    display: 'block',
    minWidth: 'calc(1em - 5px)',
    minHeight: 'calc(1em - 5px)',
    borderRadius: 1000,
    margin: {
      top: 2,
      bottom: 2,
      left: checked ? 'calc(1.5em - 5px)' : 2,
      right: checked ? 2 : 'calc(1.5em - 5px)',
    },
    transition: 'margin 0.5s, background-color 0.5s, border-color 0.5s',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'currentColor',
    backgroundColor: checked ? 'lightblue' : 'blue',
  }),
}, {
  name: 'Toggle',
});

const Toggle = ({
  onChange,
  classes: passedClasses,
  ...props
}) => {
  const ref = React.useRef();
  const [focused, setFocused] = React.useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  // eslint-disable-next-line react/destructuring-assignment
  const [checked, setChecked] = React.useState(props.checked);
  const classes = useStyles({ ...props, focused, checked });

  const toggleChecked = () => setChecked((chckd) => {
    const updated = !chckd;
    onChange(updated);
    return updated;
  });
  const keyPressToggle = (evt) => {
    if (evt.key === ' ') toggleChecked();
  };
  const handleInputChange = (evt) => setChecked(evt.target.checked);

  return (
    <span
      className={classNames(classes.root, passedClasses?.root)}
      onClick={toggleChecked}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyPress={keyPressToggle}
      role="button"
      tabIndex={0}
      ref={ref}
    >
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        type="checkbox"
        className={classes.checkbox}
        checked={checked}
        onChange={handleInputChange}
      />

      <span
        className={classNames(classes.dot, passedClasses?.dot, {
          [passedClasses?.dotChecked]: checked,
        })}
      />
    </span>
  );
};

Toggle.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string),
};

Toggle.defaultProps = {
  onChange: () => { },
  checked: false,
  classes: null,
};

export default Toggle;
