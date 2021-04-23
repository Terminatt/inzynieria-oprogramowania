import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// antd
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, Input, Select } from 'antd';

// redux
import { AppState } from '../../store';
import { loginUser, registerUser, handleUserError } from '../../store/user/actions';
import { Sex } from '../../store/user/types';

// css
import './credentials.less';
import Errors from '../reusable/errors/errors';
import { useHistory } from 'react-router';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;


export enum CredentialsType {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
}

interface FormValues {
  email: string;
  password: string;
  name?: string;
  sex?: Sex;
  repeat?: string;

}


interface ComponentProps {
  visible: boolean;
  type: CredentialsType
  onClose: () => void;
}

function Credentials(props: ComponentProps) {
  const { visible, type, onClose } = props;
  const isLogin = type === CredentialsType.LOGIN;
  const [form] = Form.useForm();
  const history = useHistory();

  const dispatch = useDispatch()
  const isLoading = useSelector((state: AppState) => state.user.isLoading)
  const errors = useSelector((state: AppState) => state.user.error?.errors);

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values: FormValues) => {
    const payload = {
      ...values,
      repeat: undefined,
    }

    if (type === CredentialsType.LOGIN) {
      dispatch(loginUser(payload, () => {
        onClose();
        history.push("/main")
      }))
    } else {
      dispatch(registerUser(payload, onClose))
    }
  }

  const onFormChange = () => {
    if (errors) {
      dispatch(handleUserError(null))
    }
  }

  return (

    <Modal
      afterClose={onReset}
      maskClosable={true}
      onCancel={onClose}
      title={isLogin ? "Zaloguj się" : "Zarejestruj się"}
      okText="Zamknij"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      onOk={onClose}
      visible={visible}
    >
      <Form
        onFinish={onFinish}
        name="credentials"
        onValuesChange={onFormChange}
        form={form}
        {...layout}

      >
        {isLogin ? (
          <>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "To pole jest wymagane" }, { type: "email", message: "Email nie jest poprawny" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Hasło"
              rules={[
                { required: true, message: "To pole jest wymagane" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="name"
              label="Nazwa użytkownika"
              rules={[{ required: true, message: "To pole jest wymagane" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "To pole jest wymagane" }, { type: "email", message: "Email nie jest poprawny" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Hasło"
              rules={[
                { required: true, message: "To pole jest wymagane" },
                { pattern: /(?=.*[A-Z])/, message: "Hasło musi zawierać choć jedną dużą literę" },
                { min: 6, message: "Hasło musi zawierać choć 6 znaków" }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              dependencies={['password']}
              name="repeat"
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
            <Form.Item name="sex" label="Płeć" rules={[{ required: true, message: "To pole jest wymagane" }]}>
              <Select
                placeholder="Płeć"
                allowClear
              >
                <Option value="male">Mężczyzna</Option>
                <Option value="female">Kobieta</Option>
              </Select>
            </Form.Item>
          </>
        )}

        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" type="primary" htmlType="submit">
            {isLogin ? "Zaloguj się" : "Zarejestruj się"}
          </Button>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Errors className="credentials-errors" errors={errors} />
    </Modal>
  );
}

export default Credentials;
