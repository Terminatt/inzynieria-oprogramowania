// core
import React, { useEffect, useState } from 'react';

// antd
import { Col, Row } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { Ebook } from '../../../store/ebooks/types';
import EbookCard from '../ebooks/ebooks-card/ebooks-card';
import { addUserEbook, deleteEbook, getEbooksCollection, selectEbook } from '../../../store/ebooks/actions';
import { openModal } from '../../../store/modals/actions';
import { ModalType } from '../../../store/modals/types';

// components
import Loading from '../../../components/loading/loading';
import EbooksModal from '../../../components/modals/ebook-modal/ebook-modal';
import Header from '../../../components/header/header';

// css
import "./dashboard.less";

// components
interface EbookDict {
  [key: string]: Ebook[];
}

function Dashboard() {
  const ebooks = useSelector((state: AppState) => state.ebooks);
  const { collection, isLoading } = ebooks;

  const userState = useSelector((state: AppState) => state.user);
  const { permissions } = userState;

  const ebook = permissions.find((el) => el.entityName === 'Ebook');
  const library = permissions.find((el) => el.entityName === 'Library');
  const review = permissions.find((el) => el.entityName === "Review");

  const [dict, setDict] = useState<EbookDict>({});
  const [parsingLoading, setParsingLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbooksCollection());
  }, [dispatch])

  useEffect(() => {
    const dict: EbookDict = {};
    setParsingLoading(true);
    collection.forEach((ebook) => {
      ebook.categories.forEach((el) => {
        if (dict[el.name]) {
          dict[el.name].push(ebook);
        } else {
          dict[el.name] = [];
          dict[el.name].push(ebook);
        }
      })
    })

    setDict(dict);
    setParsingLoading(false);
  }, [collection])


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
  const renderDashboard = () => {
    const elements: React.ReactNode[] = [];

    for (const [key, ebooks] of Object.entries(dict)) {
      elements.push((
        <Row className="dashboard__row" key={key}>
          <Col xs={24}>
            <Header>{key}</Header>
          </Col>
          <Col xs={24}>
            <Row className="dashboard__cards">
              {renderEbooks(ebooks)}
            </Row>
          </Col>
        </Row>
      ))
    }
    return elements;
  }

  const onAddToLibrary = (data?: Ebook) => {
    if (data) {
      dispatch(addUserEbook(data._id))
    }
  }

  const renderEbooks = (ebooks: Ebook[]) => {
    return ebooks.map((el) => (
      <Col key={el._id} className="item-card" xs={6}>
        <EbookCard reviewPermission={review} isAdmin={userState.user?.role.superAdmin} addToLibrary={onAddToLibrary} libraryPermission={library} permission={ebook} onDelete={onDelete} onEditClick={onEditClick} className="dashboard__card" data={el} />
      </Col>
    ))
  }

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading || parsingLoading} />
      <Row className="dashboard">
        {renderDashboard()}
      </Row>
      <EbooksModal />
    </Row>
  );
}

export default Dashboard;
