import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// antd
import Modal from 'antd/lib/modal/Modal';
import { Button, Form, Input, } from 'antd';

// redux
import { AppState } from '../../../store';
import { ModalType } from '../../../store/modals/types';
import { closeModal } from '../../../store/modals/actions';

// css
import './categories-modal.less';
import TextArea from 'antd/lib/input/TextArea';
import { addCategory, editCategory, getCategoryCollection } from '../../../store/category/actions';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


interface FormValues {
  name: string;
  description: string;

}


function CategoriesModal() {
  const modalsState = useSelector((state: AppState) => state.modals);
  let { isOpen } = modalsState;
  const [form] = Form.useForm();

  isOpen = isOpen && (modalsState.type === ModalType.ADD_CATEGORY || modalsState.type === ModalType.EDIT_CATEGORY)

  const isAdd = modalsState.type === ModalType.ADD_CATEGORY;

  const dispatch = useDispatch()
  const isLoading = useSelector((state: AppState) => state.categories.isLoading)
  const selected = useSelector((state: AppState) => state.categories.selected);

  const onClose = () => {
    dispatch(closeModal());
  }

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values: FormValues) => {
    if (isAdd) {
      dispatch(addCategory(values, () => {
        onClose();
        dispatch(getCategoryCollection());
      }));
    } else {
      if (selected) {
        dispatch(editCategory(selected._id, values, () => {
          dispatch(getCategoryCollection());
          onClose();
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
      title={isAdd ? "Stwórz nową kategorię" : "Edytuj kategorię"}
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
          label="Nazwa kategorii"
          initialValue={selected?.name}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Opis kategorii"
          initialValue={selected?.description}
          rules={[{ required: true, message: "To pole jest wymagane" }, { max: 100, message: "Opis nie może przekroczyć 100 znaków" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" type="primary" htmlType="submit">
            {isAdd ? "Stwórz kategorię" : "Zapisz kategorię"}
          </Button>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
}

export default CategoriesModal;
