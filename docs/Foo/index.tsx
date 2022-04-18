import React from 'react';
import Form, { List as RCList } from 'rc-field-form';
import 'tachyons';
import { Button, Space } from 'antd';
import 'antd/dist/antd.css';
import './index.less';
import Field from './Field';
import ErrorFields from './Field/ErrorFields';
import { calcWidget, enhanceSchema } from './utils';

export { Field, ErrorFields };

const renderTreeNode = (schema: any, children: any) => {
  if (typeof schema !== 'object') return null;
  const { name, widget, props = {}, ...rest } = schema;
  if (widget === 'Slot') {
    const childrenArr = React.Children.toArray(children);
    const currentChild = childrenArr.find((c) => {
      // 万一name使用了数组
      return JSON.stringify(c.props.name) === JSON.stringify(name);
    });
    const currentChildWithProps =
      typeof currentChild === 'function'
        ? children(schema)
        : React.cloneElement(currentChild as React.ReactElement, schema);
    return <div key={JSON.stringify(name)}>{currentChildWithProps}</div>;
  }
  const FinalWidget = calcWidget(widget);
  return (
    <div key={JSON.stringify(name)} style={{ marginBottom: 2 }}>
      <Field name={name.indexOf('.') > -1 ? name.split('.') : name} {...rest}>
        <FinalWidget {...props} style={{ width: '100%', ...props.style }} />
        {/* {React.createElement(FinalWidget, {
                ...props,
                style: { width: '100%', ...props.style },
              })} */}
      </Field>
    </div>
  );
};

const renderTreeBranch = (schema: any, children: any, isRoot = true) => {
  const layoutArr = typeof schema.layout === 'string' ? schema.layout.split('/') : [4, 12];
  const labelLayout = { gridColumn: `1 / span ${layoutArr[0]}` };
  const fieldLayout = {
    gridColumn: `${Number(layoutArr[0]) + 1} / span ${Number(layoutArr[1])}`,
  };
  const objectLayoutValue = `${Number(layoutArr[0])}/${24 - Number(layoutArr[0])}`;
  // OBJECT render
  if (
    schema.type === 'object' &&
    typeof schema.children === 'object' &&
    Object.keys(schema.children).length > 0
  ) {
    if (isRoot) {
      return (
        <fieldset key={JSON.stringify(schema.name)}>
          {schema.label && <legend>{schema.label}</legend>}
          <div
            style={
              {
                // paddingLeft: 24
              }
            }
          >
            {Object.entries(schema.children).map(([key, child]: any) => {
              return renderTreeBranch({ ...child, name: child.name || key, key }, children, false);
            })}
          </div>
        </fieldset>
      );
    }
    return (
      <div key={JSON.stringify(schema.name)} className="mono-field-container">
        <div className="mono-label" style={labelLayout}>
          {schema.label}:
        </div>
        <div className="mono-field mono-object-card" style={fieldLayout}>
          {Object.entries(schema.children).map(([key, child]: any) => {
            return renderTreeBranch(
              { ...child, name: child.name || key, key, layout: objectLayoutValue },
              children,
              false,
            );
          })}
        </div>
      </div>
    );
  }

  // LIST render
  if (schema.type === 'list') {
    const { name, item, type, label, ...rest } = schema;
    return (
      <div key={schema.name} className="mono-field-container">
        <RCList name={schema.name.includes('.') ? schema.name.split('.') : schema.name} {...rest}>
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                <div className="mono-label" style={labelLayout}>
                  {schema.label}:
                </div>
                <div className="mono-field" style={fieldLayout}>
                  {fields.map((field, index) => {
                    return (
                      <Field {...field}>
                        {(control, meta, form) => {
                          const { value, onChange } = control;
                          return (
                            <div className="mono-list-item">
                              <Form
                                component={false}
                                initialValues={value}
                                onValuesChange={(_, values) => {
                                  // console.log('values:', values);
                                  onChange(values);
                                }}
                              >
                                {Object.entries(schema.item.children).map(([key, child]: any) => {
                                  const _schema = {
                                    ...child,
                                    name: child.name || key,
                                    layout: objectLayoutValue,
                                    key,
                                  };
                                  return renderTreeBranch(_schema, children, false);
                                })}
                              </Form>
                              <Space className="mono-list-item-actions">
                                <a
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  删除
                                </a>
                                <a onClick={() => {}}>复制</a>
                              </Space>

                              {/* {meta.errors.length > 0 && <ErrorFields>{meta.errors}</ErrorFields>} */}
                            </div>
                          );
                        }}
                      </Field>
                    );
                  })}
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      add();
                    }}
                  >
                    + 添加一项
                  </Button>
                </div>
                <ErrorFields className="mono-error-field" style={fieldLayout}>
                  {errors}
                </ErrorFields>
              </>
            );
          }}
        </RCList>
      </div>
    );
  }

  return renderTreeNode(schema, children);
};

const MonoForm = (props: any) => {
  const { schema: outSchema, children, form, ...rest } = props;

  const schema = enhanceSchema(outSchema);

  return (
    <Form className="mono-form" form={form} {...rest}>
      {(values, form) => {
        return Object.entries(schema).map(([key, itemSchema]: [string | number, any]) => {
          if (typeof itemSchema !== 'object') return null;
          const _schema = {
            ...itemSchema,
            name: itemSchema.name || key,
            key,
            layout: itemSchema.layout || schema.layout || '4/12',
          };
          return renderTreeBranch(_schema, children);
        });
      }}
    </Form>
  );
};

export default MonoForm;

// const a = () => {
//   return (
//     <RCList
//       name={_schema.name.includes('.') ? _schema.name.split('.') : _schema.name}
//       rules={[
//         {
//           message: 'Must have at least 2 user!',
//           validator: async (_, value) => {
//             if (value.length < 2) {
//               throw new Error();
//             }
//           },
//         },
//       ]}
//     >
//       {(fields, { add, remove }, { errors }) => {
//         return (
//           <>
//             <div className="mono-label">{_schema.label}:</div>
//             <div className="mono-field">
//               {fields.map((field, index) => {
//                 return (
//                   <Field {...field} rules={[{ required: true }]}>
//                     {(control, meta, form) => {
//                       const { value, onChange } = control;
//                       return (
//                         <div className="">
//                           <Form
//                             component={false}
//                             initialValues={value}
//                             onValuesChange={(_, values) => {
//                               console.log('values:', values);
//                               onChange(values);
//                             }}
//                           >
//                             <Field name="pwd" rules={[{ required: true }]}>
//                               <Input />
//                             </Field>
//                             <Field name="y" rules={[{ required: true }]}>
//                               <Input />
//                             </Field>
//                           </Form>
//                           <a
//                             onClick={() => {
//                               remove(index);
//                             }}
//                           >
//                             Remove
//                           </a>
//                           <ErrorFields>{meta.errors}</ErrorFields>
//                         </div>
//                       );
//                     }}
//                   </Field>
//                 );
//               })}
//               <Button
//                 size="small"
//                 type="primary"
//                 onClick={() => {
//                   add();
//                 }}
//               >
//                 + 添加一项
//               </Button>
//             </div>
//             <ErrorFields className="mono-error-field">{errors}</ErrorFields>
//           </>
//         );
//       }}
//     </RCList>
//   );
// };
