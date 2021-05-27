// core
import React from 'react';

// antd
import { Card, Popconfirm, Tooltip, Upload } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined, UploadOutlined, BookOutlined } from '@ant-design/icons';

// custom
import { Ebook } from '../../../../store/ebooks/types';

// css
import "./ebooks-card.less";
import { RcFile } from 'antd/lib/upload';
import { Id } from '../../../../store/base/BaseEntity';


interface ComponentProps {
  addCard?: boolean;
  className?: string;
  myEbook?: boolean;
  data?: Ebook;

  file?: string;

  onClick?: () => void;
  onEditClick?: (data?: Ebook) => void;
  onDelete?: (data?: Ebook) => void;

  addToLibrary?: (data?: Ebook) => void;
  handleUpload?: (id: Id, formData: FormData, data?: Ebook) => void;

}

function EbookCard(props: ComponentProps) {
  const { addCard, myEbook } = props;

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

  const renderActions = () => {
    if (addCard) {
      return [];
    } else if (myEbook) {
      return [
        <Upload fileList={[]} beforeUpload={(file) => handleUpload(file, "file")}><UploadOutlined></UploadOutlined></Upload>,
        <Tooltip overlay="Usuń"><Popconfirm okButtonProps={{ type: "primary", className: "btn-delete" }} okText="Usuń" title="Chcesz usunąć tego ebooka?" onConfirm={onDelete}><DeleteOutlined className="red" /></Popconfirm></Tooltip>
      ]
    } else {
      return [
        <Tooltip overlay="Edytuj"><EditOutlined onClick={onEditClick} key="edit" /></Tooltip>,
        <Tooltip overlay="Dodaj do swojej biblioteczki"><PlusCircleOutlined onClick={onAddToLibrary} key="add" /></Tooltip>,
        <Tooltip overlay="Usuń"><Popconfirm okButtonProps={{ type: "primary", className: "btn-delete" }} okText="Usuń" title="Chcesz usunąć tego ebooka?" onConfirm={onDelete}><DeleteOutlined className="red" /></Popconfirm></Tooltip>
      ]
    }
  }

  const getBaseUrl = () => {
    return process.env.REACT_APP_PROXY_API || 'http://localhost:3001/';
  }



  return (
    <Card className={["card", addCard ? "add" : "", props.className ? props.className : ""].join(" ")}
      onClick={onClick}
      cover={addCard ? null : (
        <Upload fileList={[]} beforeUpload={!myEbook ? (file) => handleUpload(file, "coverImage") : undefined}>
          <img className="card__cover" alt="ebook cover" src={props.data?.coverImage ? getBaseUrl() + 'media/' + props.data.coverImage : "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"} />
        </Upload>

      )}
      actions={renderActions()}
    >
      {addCard ? (
        <div className="card__add">
          <PlusCircleOutlined />
        </div>
      ) : (
        <Meta
          title={props.data?.title}
          description={<>
            <div>{props.data?.author}</div>
            <div>Ilość stron: {props.data?.numberOfPages}</div>
            <div>Wydawca: {props.data?.publisher}</div>
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
