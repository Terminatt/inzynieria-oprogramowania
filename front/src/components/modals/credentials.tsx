import { Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

// css
import './credentials.less';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const { Option } = Select;


export enum CredentialsType {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
}


interface ComponentProps {
  visible: boolean;
  type: CredentialsType
  onClose: () => void;
}

function Credentials(props: ComponentProps) {
  const { visible, type, onClose } = props;
  const isLogin = type === CredentialsType.LOGIN;


  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (

    <Modal
      title={isLogin ? "Zaloguj się" : "Zarejestruj się"}
      onCancel={onClose}
      visible={visible}
    >
      <Form
        {...layout}

      >
        {isLogin ? (
          <>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }, { type: "email", message: "Email nie jest poprawny" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Hasło"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="username"
              label="Nazwa użytkownika"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }, { type: "email", message: "Email nie jest poprawny" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Hasło"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              dependencies={['password']}
              name="repeat-password"
              label="Powtórz hasło"
              rules={[
                { required: true, message: "Powtórz swoje hasło" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Hasła się nie zgadzają'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="gender" label="Płeć" rules={[{ required: true }]}>
              <Select
                placeholder="Płeć"
                allowClear
              >
                <Option value="male">Mężczyzna</Option>
                <Option value="female">Kobieta</Option>
                <Option value="other">Wolę nie podawać</Option>
              </Select>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}

export default Credentials;
