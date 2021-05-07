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
import { Row } from 'antd';

// custom
import CategoriesCard from './categories-card/categories-card';
import CategoriesModal from '../../../components/modals/categories-modal/categories-modal';

// css
import "./categories.less";

// components

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state: AppState) => state.categories);

  const onClickAdd = () => {
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
    <Row className="categories">
      <div className="categories__cards">
        <CategoriesCard onClick={onClickAdd} className="categories__card" addCard />
        {categories.collection.map((el) => (
          <CategoriesCard onDelete={onDelete} key={el._id} onEditClick={onEditClick} data={el} className="categories__card" />
        ))}
      </div>
      <CategoriesModal />
    </Row>
  );
}

export default Categories;
