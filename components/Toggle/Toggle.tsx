import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import classNames from 'classnames';
import { createStyles as createUseStyles } from '@mantine/core';

const useStyles = createUseStyles({
  root: {},
  checkbox: {},
  dot: {},
});

const Toggle = ({
  onChange,
  classes: passedClasses,
  ...props
}: any) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [focused, setFocused] = React.useState<boolean>(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  
  const [checked, setChecked] = React.useState<boolean>(props.checked);
  const {classes} = useStyles();

  const toggleChecked = () => setChecked((chckd) => {
    const updated = !chckd;
    onChange(updated);
    return updated;
  });
  const keyPressToggle: KeyboardEventHandler<HTMLSpanElement> = (evt) => {
    if (evt.key === ' ') toggleChecked();
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => setChecked(evt.target.checked);

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

export default Toggle;
