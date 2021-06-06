// core
import React from 'react';

// antd
import { Card, notification, Popconfirm, Tooltip, Upload } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined, UploadOutlined, BookOutlined, StarOutlined, StarFilled, FormOutlined } from '@ant-design/icons';

// custom
import { Ebook } from '../../../../store/ebooks/types';

// css
import "./ebooks-card.less";
import { RcFile } from 'antd/lib/upload';
import { Id } from '../../../../store/base/BaseEntity';
import { Permission } from '../../../../store/roles/types';
import { useHistory } from 'react-router';
import * as uuid from "uuid";


interface ComponentProps {
  addCard?: boolean;
  className?: string;
  myEbook?: boolean;
  data?: Ebook;
  permission?: Permission;
  libraryPermission?: Permission;
  reviewPermission?: Permission;
  isAdmin?: boolean;
  file?: string;

  onClick?: () => void;
  onEditClick?: (data?: Ebook) => void;
  onDelete?: (data?: Ebook) => void;

  addToLibrary?: (data?: Ebook) => void;
  handleUpload?: (id: Id, formData: FormData, data?: Ebook) => void;

}

function EbookCard(props: ComponentProps) {
  const { addCard, myEbook } = props;
  const history = useHistory();

  const onEditClick = () => {
    if (props.onEditClick) {
      props.onEditClick(props.data);
    }
  }

  const onClick = () => {

    if (props.onClick) {
      props.onClick();
    }

  }

  const onDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.data);
    }
  }

  const onAddToLibrary = () => {
    if (props.addToLibrary) {
      props.addToLibrary(props.data);
    }
  }


  const handleUpload = async (file: RcFile, fileType: "file" | "coverImage") => {
    const formData = new FormData();
    formData.append(fileType, file);

    if (props.handleUpload && props.data) {
      props.handleUpload(props.data._id, formData, props.data)
    }

    return false;
  };

  const goToEbook = () => {
    if (props.isAdmin || props.reviewPermission?.permissions.includes("DISPLAY")) {
      history.push(`/main/ebook/${props.data?._id}`)
    }
  }

  const renderActions = () => {
    if (addCard) {
      return [];
    } else if (myEbook) {
      return [
        props.isAdmin || props.libraryPermission?.permissions.includes("EDIT") ? <Upload fileList={[]} beforeUpload={(file) => handleUpload(file, "file")}><UploadOutlined ></UploadOutlined></Upload> : null,
        props.isAdmin || props.libraryPermission?.permissions.includes("DELETE") ? <Tooltip overlay="Usuń"><Popconfirm okButtonProps={{ type: "primary", className: "btn-delete" }} okText="Usuń" title="Chcesz odpiąć tego ebooka?" onConfirm={onDelete}><DeleteOutlined className="red" /></Popconfirm></Tooltip> : null,
        props.isAdmin || props.reviewPermission?.permissions.includes("EDIT") ? <Tooltip overlay="Dodaj recenzje"><FormOutlined onClick={goToEbook} /></Tooltip> : null
      ].filter((el) => el !== null)
    } else {
      return [
        props.isAdmin || props.permission?.permissions.includes("EDIT") ? <Tooltip overlay="Edytuj"><EditOutlined onClick={onEditClick} key="edit" /></Tooltip> : null,
        props.isAdmin || props.libraryPermission?.permissions.includes("EDIT") ? <Tooltip overlay="Dodaj do swojej biblioteczki"><PlusCircleOutlined onClick={onAddToLibrary} key="add" /></Tooltip> : null,
        props.isAdmin || props.permission?.permissions.includes("DELETE") ? <Tooltip overlay="Usuń"><Popconfirm okButtonProps={{ type: "primary", className: "btn-delete" }} okText="Usuń" title="Chcesz usunąć tego ebooka?" onConfirm={onDelete}
        ><DeleteOutlined className="red" /></Popconfirm></Tooltip> : null,
        props.isAdmin || props.reviewPermission?.permissions.includes("EDIT") ? <Tooltip overlay="Dodaj recenzje"><FormOutlined onClick={goToEbook} /></Tooltip> : null
      ].filter((el) => el !== null)
    }
  }

  const getBaseUrl = () => {
    return process.env.REACT_APP_PROXY_API || 'http://localhost:3001/';
  }

  const renderStars = () => {
    const stars: React.ReactElement[] = [];
    if (props.data && typeof props.data.averageRating === 'number') {

      for (let i = 0; i < Math.round(props.data.averageRating); i++) {
        stars.push(<StarFilled key={uuid.v4()} style={{ color: 'gold' }} />)
      }

      for (let i = 0; i < 5 - Math.round(props.data.averageRating); i++) {
        stars.push(<StarOutlined key={uuid.v4()} />)
      }

    } else {
      for (let i = 0; i < 5; i++) {
        stars.push(<StarOutlined key={uuid.v4()} />)
      }
    }
    return stars;
  }


  return (
    <Card className={["card", addCard ? "add" : "", props.className ? props.className : ""].join(" ")}
      onClick={onClick}
      cover={addCard ? null : (
        props.isAdmin || props.permission?.permissions.includes("EDIT") ? (
          <Upload fileList={[]} beforeUpload={!myEbook ? (file) => handleUpload(file, "coverImage") : undefined}>
            <img className="card__cover" alt="ebook cover" src={props.data?.coverImage ? getBaseUrl() + 'media/' + props.data.coverImage : "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"} />
          </Upload>
        ) : (
          <img className="card__cover" alt="ebook cover" src={props.data?.coverImage ? getBaseUrl() + 'media/' + props.data?.coverImage : "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"} />
        )

      )}
      actions={renderActions()}
    >
      {addCard ? (
        <div className="card__add">
          <PlusCircleOutlined />
        </div>
      ) : (
        <Meta
          title={<span className="card__title" onClick={goToEbook}>{props.data?.title}</span>}
          description={<>
            <div>{props.data?.author}</div>
            <div>Ilość stron: {props.data?.numberOfPages}</div>
            <div>Wydawca: {props.data?.publisher}</div>
            <div>{renderStars()}  {props.data?.averageRating ? props.data?.nrOfRatings : null}</div>
            {props.file ? (
              <div className="card__link"><a target="_blank" rel="noreferrer" href={getBaseUrl() + 'media/' + props.file}><BookOutlined />  Ebook</a></div>
            ) : null}
          </>}
        />

      )}
    </Card>
  );
}

export default EbookCard;
