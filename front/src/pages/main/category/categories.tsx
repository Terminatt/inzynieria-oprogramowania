// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { openModal } from '../../../store/modals/actions';
import { ModalType } from '../../../store/modals/types';
import { deleteCategory, getCategoryCollection, selectCategory } from '../../../store/category/actions';
import { AppState } from '../../../store';
import { Category } from '../../../store/category/types';

// antd
import { Col, Row } from 'antd';

// custom
import CategoriesCard from './categories-card/categories-card';
import CategoriesModal from '../../../components/modals/categories-modal/categories-modal';

// css
import "./categories.less";
import Loading from '../../../components/loading/loading';

// components

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state: AppState) => state.categories);

  const { collection, isLoading } = categories;

  const userState = useSelector((state: AppState) => state.user);
  const { permissions } = userState;

  const category = permissions.find((el) => el.entityName === 'Category');

  const onClickAdd = () => {
    dispatch(selectCategory(null));
    dispatch(openModal(ModalType.ADD_CATEGORY));
  }

  const onEditClick = (data?: Category) => {
    if (data) {
      dispatch(selectCategory(data))
      dispatch(openModal(ModalType.EDIT_CATEGORY));
    }
  }

  const onDelete = (data?: Category) => {
    if (data) {
      dispatch(deleteCategory(data._id, () => {
        dispatch(getCategoryCollection());
      }))
    }
  }

  useEffect(() => {
    dispatch(getCategoryCollection());
  }, [dispatch])

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="categories">
        <Row className="categories__cards">
          {category?.permissions.includes("CREATE") ? (
            <Col className="item-card" xs={6}>
              <CategoriesCard onClick={onClickAdd} addCard />
            </Col>
          ) : null}
          {collection.map((el) => (
            <Col key={el._id} className="item-card" xs={6}>
              <CategoriesCard isAdmin={userState.user?.role.superAdmin} permission={category} onDelete={onDelete} onEditClick={onEditClick} data={el} />
            </Col>
          ))}
        </Row>
        <CategoriesModal />
      </Row>
    </Row>
  );
}

export default Categories;
