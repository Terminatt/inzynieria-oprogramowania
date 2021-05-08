// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { openModal } from '../../../store/modals/actions';
import { ModalType } from '../../../store/modals/types';
import { deleteEbook, getEbooksCollection, selectEbook } from '../../../store/ebooks/actions';
import { getCategoryCollection } from '../../../store/category/actions';
import { AppState } from '../../../store';


// antd
import { Col, Row } from 'antd';

// custom
import EbookCard from './ebooks-card/ebooks-card';
import EbooksModal from '../../../components/modals/ebook-modal/ebook-modal';

// css
import "./ebooks.less";
import { Ebook } from '../../../store/ebooks/types';
import Loading from '../../../components/loading/loading';


function Ebooks() {
  const dispatch = useDispatch();

  const ebooks = useSelector((state: AppState) => state.ebooks);
  const { collection, isLoading } = ebooks;

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
  return (
    <Row>
      <Loading isLoading={isLoading} />
      <Row className="ebooks">
        <Row className="ebooks__cards">
          <Col className="item-card" xs={6}>
            <EbookCard onClick={onClick} addCard />
          </Col>
          {collection.map((el) => (
            <Col key={el._id} className="item-card" xs={6}>
              <EbookCard onDelete={onDelete} onEditClick={onEditClick} data={el} />
            </Col>
          ))}
        </Row>
        <EbooksModal />
      </Row>

    </Row>
  );
}

export default Ebooks;
