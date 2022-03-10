import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import useStyles from './Toggle.styles';

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
  const {classes, cx} = useStyles();

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
      className={cx(classes.root, passedClasses?.root)}
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
        className={cx(classes.dot, passedClasses?.dot, {
          [passedClasses?.dotChecked]: checked,
        })}
      />
    </span>
  );
};

export default Toggle;
