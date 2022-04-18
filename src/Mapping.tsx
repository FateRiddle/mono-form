import React from 'react';
import { Input, Select, Button, Space, Checkbox as AntCheckbox } from 'antd';

const Checkbox = (props: any) => {
  const { value, onChange, ...rest } = props;
  return (
    <AntCheckbox
      checked={value}
      onChange={(e: any) => {
        onChange(e.target.checked);
      }}
      {...rest}
    />
  );
};

const mapping: any = {
  Input,
  Select,
  Checkbox,
};

export default mapping;
