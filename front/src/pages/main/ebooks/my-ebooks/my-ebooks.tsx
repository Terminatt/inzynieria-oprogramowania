// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { deleteUserEbook, getEbooksUsersCollection } from '../../../../store/ebooks/actions';
import { getCategoryCollection } from '../../../../store/category/actions';
import { AppState } from '../../../../store';
import { Ebook } from '../../../../store/ebooks/types';


// antd
import { Col, notification, Row } from 'antd';

// custom
import EbookCard from '../ebooks-card/ebooks-card';
import EbooksModal from '../../../../components/modals/ebook-modal/ebook-modal';
import Loading from '../../../../components/loading/loading';

// css
import "./my-ebooks.less";
import axios from '../../../../axios/axios';
import { Id } from '../../../../store/base/BaseEntity';


function MyEbooks() {
  const dispatch = useDispatch();

  const ebooks = useSelector((state: AppState) => state.ebooks);
  const { userCollection, isLoading } = ebooks;

  useEffect(() => {
    dispatch(getCategoryCollection());
    dispatch(getEbooksUsersCollection());
  }, [dispatch])

  const onDelete = (data?: Ebook) => {
    if (data) {
      const userEbook = userCollection.filter((el) => el.ebookId === data._id)[0];
      dispatch(deleteUserEbook(userEbook._id, () => {
        dispatch(getEbooksUsersCollection())
      }));
    }
  }

  const handleUpload = async (id: Id, formData: FormData) => {
    try {
      const userEbook = userCollection.filter((el) => el.ebookId === id)[0];
      await axios.put(`/user/library/${userEbook._id}`, formData);
      dispatch(getEbooksUsersCollection());

    } catch (e) {
      notification.error({ message: "The upload failed" })
    }
  }

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="ebooks">
        <Row className="ebooks__cards">
          {userCollection.map((el) => (
            <Col key={el._id} className="item-card" xs={6}>
              <EbookCard file={el.file} myEbook handleUpload={handleUpload} onDelete={onDelete} data={el.ebook} />
            </Col>
          ))}
        </Row>
        <EbooksModal />
      </Row>

    </Row>
  );
}

export default MyEbooks;
