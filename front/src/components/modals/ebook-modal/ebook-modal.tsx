import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// antd
import Modal from 'antd/lib/modal/Modal';
import { Button, DatePicker, Form, Input, Select, } from 'antd';
import moment from 'moment';

// redux
import { AppState } from '../../../store';
import { ModalType } from '../../../store/modals/types';
import { closeModal } from '../../../store/modals/actions';
import { addEbook, editEbook, getEbooksCollection } from '../../../store/ebooks/actions';
import { EbookPayload } from '../../../store/ebooks/types';

// css
import './ebook-modal.less';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const { Option } = Select;


interface FormValues extends EbookPayload {

}


function EbooksModal() {
  const modalsState = useSelector((state: AppState) => state.modals);
  let { isOpen } = modalsState;
  const [form] = Form.useForm();

  isOpen = isOpen && (modalsState.type === ModalType.ADD_EBOOK || modalsState.type === ModalType.EDIT_EBOOK)

  const isAdd = modalsState.type === ModalType.ADD_EBOOK;

  const dispatch = useDispatch()
  const isLoading = useSelector((state: AppState) => state.ebooks.isLoading)
  const selected = useSelector((state: AppState) => state.ebooks.selected);
  const categories = useSelector((state: AppState) => state.categories.collection);

  const onClose = () => {
    dispatch(closeModal());
  }

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values: FormValues) => {
    if (isAdd) {
      dispatch(addEbook(values, () => {
        closeModal();
        dispatch(getEbooksCollection());
      }));
    } else {
      if (selected) {
        dispatch(editEbook(selected._id, values, () => {
          dispatch(getEbooksCollection());
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
          name="title"
          label="Nazwa książki"
          initialValue={selected?.title}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="author"
          label="Autor"
          initialValue={selected?.author}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="publisher"
          label="Wydawca"
          initialValue={selected?.publisher}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="numberOfPages"
          label="Ilość stron"
          initialValue={selected?.numberOfPages}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="releaseDate"
          label="Data wydania"
          initialValue={moment(selected?.releaseDate)}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="categories"
          label="Kategorie"
          initialValue={selected?.categories.map((el) => el._id)}
          rules={[{ required: true, message: "To pole jest wymagane" }]}
        >
          <Select
            mode="multiple"
            allowClear
          >
            {categories.map((el) => (
              <Option key={el._id} value={el._id}>{el.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" type="primary" htmlType="submit">
            {isAdd ? "Stwórz książke" : "Zapisz książke"}
          </Button>
          <Button disabled={isLoading} loading={isLoading} className="credentials-btn" htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
}

export default EbooksModal;
