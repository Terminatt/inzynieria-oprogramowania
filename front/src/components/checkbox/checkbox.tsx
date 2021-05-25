import { Checkbox, CheckboxProps } from 'antd';
import React, { useEffect, useState } from 'react';

interface ComponentProps extends CheckboxProps {
  initialChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

function CustomCheckbox(props: ComponentProps) {
  const { children } = props;
  const [checked, setChecked] = useState<boolean>(false)

  const onChange = () => {
    setChecked(!checked)
    if (props.onCheckboxChange) {
      props.onCheckboxChange(!checked)
    }
  }

  useEffect(() => {
    setChecked(!!props.initialChecked)
  }, [props.initialChecked])

  return (
    <Checkbox {...props} onChange={onChange} checked={checked}>{children}</Checkbox>
  );
}

export default CustomCheckbox;
