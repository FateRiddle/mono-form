/* eslint-disable react/prop-types */

import React from 'react';
import Form, { Field } from 'rc-field-form';
import { Input } from 'antd';
import LabelField from './LabelField';

const { List, useForm } = Form;

const Error = ({ children, warning }: any) => (
  <ul style={{ color: warning ? 'orange' : 'red' }}>
    {children.map((error: React.ReactNode, index: number) => (
      <li key={index}>{error}</li>
    ))}
  </ul>
);

const Demo = () => {
  const [form] = useForm();

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values:', values);
      }}
      preserve={false}
    >
      <Form.Field shouldUpdate>{() => JSON.stringify(form.getFieldsValue(), null, 2)}</Form.Field>
      <List
        name="users"
        initialValue={[
          { x: 'haha', y: 'haha' },
          { x: 'haha2', y: 'hah2a' },
        ]}
        rules={[
          {
            message: 'Must have at least 2 user!',
            validator: async (_, value) => {
              if (value.length < 2) {
                // throw new Error();
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => {
          return (
            <div>
              <fieldset>
                <legend>Personal Information</legend>
                {fields.map((field, index) => {
                  console.log(field, 'field');
                  return (
                    <LabelField {...field} rules={[{ required: true }]}>
                      {(control) => {
                        const { value, onChange } = control;
                        return (
                          <div className="">
                            <Form
                              component={false}
                              initialValues={value}
                              onValuesChange={(_, values) => {
                                console.log('values:', values);
                                onChange(values);
                              }}
                            >
                              <Field name="x" rules={[{ required: true }]}>
                                {(control, meta, form) => {
                                  return (
                                    <div>
                                      <Input {...control} />
                                      <Error>{meta.errors}</Error>
                                    </div>
                                  );
                                }}
                              </Field>
                              <Field name="y" rules={[{ required: true }]}>
                                {(control, meta, form) => {
                                  return (
                                    <div>
                                      <Input {...control} />
                                      <Error>{meta.errors}</Error>
                                    </div>
                                  );
                                }}
                              </Field>
                            </Form>
                            <a
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              Remove
                            </a>
                          </div>
                        );
                      }}
                    </LabelField>
                  );
                })}

                <ul>
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    add();
                  }}
                >
                  + New User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('sagfg');
                    remove(1);
                  }}
                >
                  Remove index: 1
                </button>
              </fieldset>
            </div>
          );
        }}
      </List>
    </Form>
  );
};

export default Demo;
