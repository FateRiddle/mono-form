import React, { useEffect } from 'react';
import Form, { useForm, List } from 'rc-field-form';
import 'tachyons';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import MonoForm, { Field } from './index';

const schema = {
  isRoot: true,
  // layout: '4/20',
  layout: '8/12',
  userName: {
    label: 'userName',
    widget: 'Input',
    rules: [{ required: true, message: 'Please input your username!' }],
  },
  password: {
    label: '密码',
    widget: 'Input.Password',
  },
  te: {
    label: '都都',
    widget: 'Radio.Group',
    props: {
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ],
      // optionType: 'button',
    },
  },
  slot2: {
    label: '插槽组件2',
    widget: 'Slot',
  },
  select: {
    label: '选择',
    widget: 'Select',
    props: {
      options: [
        { label: '早', value: 'mor' },
        { label: '晚', value: 'eve' },
      ],
    },
  },
  slot1: {
    label: '插槽组件1',
    widget: 'Slot',
  },
  testList: {
    type: 'list',
    label: '测试数组',
    // layout: '4/12',
    item: {
      type: 'object',
      children: {
        pwd: {
          label: '密码',
          widget: 'Input.Password',
        },
        test: {
          label: 'cece',
          widget: 'Input',
        },
      },
    },
    // item: {
    //   label: 'simple',
    //   widget: 'Input.TextArea',
    // },
  },
  testObject: {
    type: 'object',
    label: '测试对象',
    children: {
      password: {
        name: 'obj.pwd',
        label: '密码',
        widget: 'Input.Password',
      },
      // slot3: {
      //   label: 'slot3',
      //   widget: 'Slot',
      // },
      object2: {
        type: 'object',
        label: '测试对象2',
        children: {
          password: {
            name: 'obj.pwd2',
            label: '密码',
            widget: 'Input.Password',
          },
        },
      },
    },
  },
};

export default () => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({ testList: [{ pwd: '234' }] });
  }, []);

  return (
    <div className="">
      <MonoForm
        form={form}
        schema={schema}
        onFinish={(values: any) => {
          console.log('Submit:', values);
        }}
      >
        <Field name="slot1" rules={[{ required: true, message: '这里必填' }]}>
          <Input placeholder="xxx" />
        </Field>
        <Field name="slot2">
          <div style={{ color: 'green' }}>hahah</div>
        </Field>
      </MonoForm>

      <button onClick={form.submit}>submit</button>
    </div>
  );
};

{
  /* <List
          name="slot2"
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
                                <RCField name="x" rules={[{ required: true }]}>
                                  {(control, meta, form) => {
                                    return (
                                      <div>
                                        <Input {...control} />
                                        <Error>{meta.errors}</Error>
                                      </div>
                                    );
                                  }}
                                </RCField>
                                <RCField name="y" rules={[{ required: true }]}>
                                  {(control, meta, form) => {
                                    return (
                                      <div>
                                        <Input {...control} />
                                        <Error>{meta.errors}</Error>
                                      </div>
                                    );
                                  }}
                                </RCField>
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
        </List> */
}
