// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// redux
import { AppState } from '../../../store';
import { getEbook } from '../../../store/ebooks/actions';
import { createReview, getReviewForEbookCollection, getUserReview, updateReview } from '../../../store/review/actions';
import { StarOutlined, StarFilled } from '@ant-design/icons';

// antd
import { Button, Col, Form, List, notification, Rate, Row } from 'antd';

// custom
import Loading from '../../../components/loading/loading';

// css
import './review.less';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Scrollbars from 'react-custom-scrollbars-2';

import * as uuid from "uuid";

interface FormValues {
  stars: number;
  comment: string;
}
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};


function Review() {
  const dispatch = useDispatch();
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();


  const ebooks = useSelector((state: AppState) => state.ebooks);
  const reviews = useSelector((state: AppState) => state.reviews);
  const { selected } = ebooks;
  const { collection } = reviews;

  const userState = useSelector((state: AppState) => state.user);
  const { permissions } = userState;

  const review = permissions.find((el) => el.entityName === 'Review');

  const getBaseUrl = () => {
    return process.env.REACT_APP_PROXY_API || 'http://localhost:3001/';
  }

  const renderStars = (rating?: number | null) => {
    const stars: React.ReactElement[] = [];
    if (selected && typeof rating === 'number') {

      for (let i = 0; i < Math.round(rating); i++) {
        stars.push(<StarFilled key={uuid.v4()} style={{ color: 'gold' }} />)
      }

      for (let i = 0; i < 5 - Math.round(rating); i++) {
        stars.push(<StarOutlined key={uuid.v4()} />)
      }

    } else {
      for (let i = 0; i < 5; i++) {
        stars.push(<StarOutlined key={uuid.v4()} />)
      }
    }
    return stars
  }


  const onFinish = (values: FormValues) => {
    if (!values.stars) {
      values.stars = 1;
    }

    if (reviews.selected) {
      dispatch(updateReview(reviews.selected._id, { ...values, }, () => {
        notification.success({ message: "Twoja recenzja została zaktualizowana" })
        dispatch(getEbook(id, () => {
          dispatch(getReviewForEbookCollection(id));
          if (selected && userState.user) {
            dispatch(getUserReview(selected?._id, userState.user?._id))
          }
        }))
      }))
    } else {
      dispatch(createReview({ ...values, ebookId: selected?._id }, () => {
        notification.success({ message: "Twoja recenzja została dodana" })
        dispatch(getEbook(id, () => {
          dispatch(getReviewForEbookCollection(id));
          if (selected && userState.user) {
            dispatch(getUserReview(selected?._id, userState.user?._id))
          }
        }))
      }))
    }
  }

  useEffect(() => {
    dispatch(getEbook(id, () => {
      dispatch(getReviewForEbookCollection(id));
      if (userState.user) {
        dispatch(getUserReview(id, userState.user?._id))
      }
    }))
  }, [id, dispatch, userState.user])

  useEffect(() => {
    form.setFieldsValue({
      "stars": reviews.selected?.stars,
      "comment": reviews.selected?.comment,
    })
  }, [reviews.selected, form])


  return (
    <Row className="scroll-container">
      <Loading isLoading={ebooks.isLoading || reviews.isLoading} />
      <Row className="roles">
        <Col xs={24} className="roles__board users scroll-container">
          <Row className="roles__header review-header">
            <Col xs={8}>
              <img style={{ width: "100%", borderRadius: "6px" }} alt="ebook cover" src={selected?.coverImage ? getBaseUrl() + 'media/' + selected?.coverImage : "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"} />
            </Col>
            <Col className="review-right" xs={16}>
              <Col className="ebook-info" xs={24}>
                <h2 className="review-heading">{selected?.title}</h2>
                <div className="info">{selected?.author}</div>
                <div>Ilość stron: {selected?.numberOfPages}</div>
                <div>Wydawca: {selected?.publisher}</div>
                <div style={{ width: 'max-content', position: 'relative' }}>{renderStars(selected?.averageRating)}  <span style={{ position: 'absolute', bottom: "0.5px" }}>({selected?.averageRating ? selected?.nrOfRatings : null})</span></div>
              </Col>
              <Col className="review" xs={24}>
                <h3>Recenzja:</h3>
                <Form onFinish={onFinish} {...layout} form={form}>
                  <Form.Item rules={[{ min: 1, message: "Minimalna ocena wynosi 1" }, { message: "Ocena jest wymagana", required: true }]} initialValue={reviews.selected ? reviews.selected.stars : 1} style={{ marginBottom: '6px' }} name="stars">
                    <Rate disabled={!userState.user?.role.superAdmin && !review?.permissions.includes("EDIT")} />
                  </Form.Item>
                  <Form.Item initialValue={reviews.selected?.comment} label="Komentarz na temat książki" name="comment" rules={[{ message: "To pole jest wymagane", required: true }]}>
                    <TextArea disabled={!userState.user?.role.superAdmin && !review?.permissions.includes("EDIT")} />
                  </Form.Item>
                  <Form.Item>
                    <Button disabled={(!userState.user?.role.superAdmin && !review?.permissions.includes("EDIT")) || ebooks.isLoading || reviews.isLoading} loading={ebooks.isLoading || reviews.isLoading} type="primary" htmlType="submit">
                      Zapisz
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Col>
          </Row>
          <Row className="reviews">
            <Col xs={24}>
              <Scrollbars>
                <List key={uuid.v4()} bordered size="small" dataSource={collection} renderItem={(el) => (
                  <List.Item key={el._id}>
                    <List.Item.Meta title={el.creator.name} description={
                      <>
                        <div>{renderStars(el.stars)}</div>
                        <div>{el.comment}</div>
                      </>
                    } />
                  </List.Item>
                )}>
                </List>
              </Scrollbars>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}



export default Review;
