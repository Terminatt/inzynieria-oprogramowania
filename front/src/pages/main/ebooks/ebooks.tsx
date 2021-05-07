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
import { Row } from 'antd';

// custom
import EbookCard from './ebooks-card/ebooks-card';
import EbooksModal from '../../../components/modals/ebook-modal/ebook-modal';

// css
import "./ebooks.less";
import { Ebook } from '../../../store/ebooks/types';


function Ebooks() {
  const dispatch = useDispatch();

  const ebooks = useSelector((state: AppState) => state.ebooks.collection);

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
    <Row className="ebooks">
      <div className="ebooks__cards">
        <EbookCard onClick={onClick} addCard />
        {ebooks.map((el) => (
          <EbookCard key={el._id} onDelete={onDelete} onEditClick={onEditClick} className="ebooks__card" data={el} />
        ))}
      </div>
      <EbooksModal />
    </Row>
  );
}

export default Ebooks;
