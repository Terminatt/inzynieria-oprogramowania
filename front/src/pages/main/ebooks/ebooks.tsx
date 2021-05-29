// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { openModal } from '../../../store/modals/actions';
import { ModalType } from '../../../store/modals/types';
import { addUserEbook, deleteEbook, getEbooksCollection, selectEbook } from '../../../store/ebooks/actions';
import { getCategoryCollection } from '../../../store/category/actions';
import { AppState } from '../../../store';


// antd
import { Col, notification, Row } from 'antd';

// custom
import EbookCard from './ebooks-card/ebooks-card';
import EbooksModal from '../../../components/modals/ebook-modal/ebook-modal';

// css
import "./ebooks.less";
import { Ebook } from '../../../store/ebooks/types';
import Loading from '../../../components/loading/loading';
import { Id } from '../../../store/base/BaseEntity';
import axios from '../../../axios/axios';


function Ebooks() {
  const dispatch = useDispatch();

  const ebooks = useSelector((state: AppState) => state.ebooks);
  const { collection, isLoading } = ebooks;

  const userState = useSelector((state: AppState) => state.user);
  const { permissions } = userState;

  const ebook = permissions.find((el) => el.entityName === 'Ebook');
  const library = permissions.find((el) => el.entityName === 'Library');

  useEffect(() => {
    dispatch(getCategoryCollection());
    dispatch(getEbooksCollection());
  }, [dispatch])

  const onClick = () => {
    dispatch(selectEbook(null));
    dispatch(openModal(ModalType.ADD_EBOOK));
  }

  const onEditClick = (data?: Ebook) => {
    if (data) {
      dispatch(selectEbook(data))
      dispatch(openModal(ModalType.EDIT_EBOOK));
    }
  }

  const onDelete = (data?: Ebook) => {
    if (data) {
      dispatch(deleteEbook(data._id, () => {
        dispatch(getEbooksCollection())
      }));
    }
  }

  const onAddToLibrary = (data?: Ebook) => {
    if (data) {
      dispatch(addUserEbook(data._id))
    }
  }

  const handleUpload = async (id: Id, formData: FormData) => {
    try {
      await axios.put(`/ebook/ebook/${id}`, formData);
      dispatch(getEbooksCollection());

    } catch (e) {
      notification.error({ message: "The upload failed" })
    }
  }
  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="ebooks">
        <Row className="ebooks__cards">
          {userState.user?.role.superAdmin || ebook?.permissions.includes("CREATE") ? (
            <Col className="item-card" xs={6}>
              <EbookCard onClick={onClick} addCard />
            </Col>
          ) : null}
          {collection.map((el) => (
            <Col key={el._id} className="item-card" xs={6}>
              <EbookCard libraryPermission={library} isAdmin={userState.user?.role.superAdmin} permission={ebook} handleUpload={handleUpload} addToLibrary={onAddToLibrary} onDelete={onDelete} onEditClick={onEditClick} data={el} />
            </Col>
          ))}
        </Row>
        <EbooksModal />
      </Row>

    </Row>
  );
}

export default Ebooks;
