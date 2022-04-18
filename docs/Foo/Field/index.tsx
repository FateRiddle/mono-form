import React, { FC } from 'react';
import { Field as RCField } from 'rc-field-form';
import ErrorFields from './ErrorFields';
import type { FieldProps } from 'rc-field-form/lib/Field';
interface LabelFieldProps extends FieldProps {
  label?: React.ReactNode;
}

export const Field: FC<LabelFieldProps> = (props: any) => {
  const { children, label, layout, ...rest } = props;
  const layoutArr = typeof layout === 'string' ? layout.split('/') : [4, 12];
  const labelLayout = { gridColumn: `1 / span ${layoutArr[0]}` };
  const fieldLayout = {
    gridColumn: `${Number(layoutArr[0]) + 1} / span ${Number(layoutArr[1])}`,
  };
  return (
    <RCField {...rest}>
      {(control, meta, form) => {
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...control,
              });
        return (
          <div className={`mono-field-container ${label ? '' : 'mono-field-no-title'}`}>
            {label && (
              <div className="mono-label" style={labelLayout}>
                {label}:
              </div>
            )}
            <div className="mono-field" style={fieldLayout}>
              {childNode}
            </div>
            <ErrorFields className="mono-error-field" style={fieldLayout}>
              {meta.errors}
            </ErrorFields>
          </div>
        );
      }}
    </RCField>
  );
};

const FieldState = ({ form, name }: any) => {
  const touched = form.isFieldTouched(name);
  const validating = form.isFieldValidating(name);

  return (
    <div
      style={{
        color: 'green',
        position: 'absolute',
        marginTop: -35,
        left: 200,
      }}
    >
      {touched ? <span>Touched!</span> : null}
      {validating ? <span>Validating!</span> : null}
    </div>
  );
};

export default Field;
