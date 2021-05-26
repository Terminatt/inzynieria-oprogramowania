import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// antd
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, Input, } from 'antd';

// redux
import { AppState } from '../../../store';
import { ModalType } from '../../../store/modals/types';
import { closeModal } from '../../../store/modals/actions';
import { createRole, getRolesCollection, selectRole, updateRole } from '../../../store/roles/actions';
import { RolePayload } from '../../../store/roles/types';

// css
import './roles-modal.less';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};




interface FormValues extends RolePayload {
}


function RolesModal() {
  const modalsState = useSelector((state: AppState) => state.modals);
  let { isOpen } = modalsState;
  const [form] = Form.useForm();

  isOpen = isOpen && (modalsState.type === ModalType.ADD_ROLE || modalsState.type === ModalType.EDIT_ROLE)

  const isAdd = modalsState.type === ModalType.ADD_ROLE;

  const dispatch = useDispatch()
  const isLoading = useSelector((state: AppState) => state.roles.isLoading)
  const selected = useSelector((state: AppState) => state.roles.selected)

  const onClose = () => {
    dispatch(closeModal());
  }

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values: FormValues) => {
    if (isAdd) {
      dispatch(createRole(values, () => {
        dispatch(getRolesCollection())
        dispatch(selectRole(null))
      }))
    } else {
      if (selected) {
        dispatch(updateRole(selected._id, values, () => {
          dispatch(getRolesCollection())
          dispatch(selectRole(null))
        }))
      }
    }
  }

  return (

    <Modal
      afterClose={onReset}
      maskClosable={true}
      destroyOnClose
      onCancel={onClose}
      title={isAdd ? "Stwórz nową rolę" : "Edytuj rolę"}
      okText="Zamknij"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      onOk={onClose}
      visible={isOpen}
    >
      <Form
        onFinish={onFinish}
        name="credentials"
        form={form}
        {...layout}

      >
        <Form.Item
          name="name"
          label="Nazwa roli"
          initialValue={selected?.name}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" type="primary" htmlType="submit">
            {isAdd ? "Stwórz rolę" : "Zapisz rolę"}
          </Button>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
}

export default RolesModal;
