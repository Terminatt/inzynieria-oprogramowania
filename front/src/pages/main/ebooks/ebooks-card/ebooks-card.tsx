// core
import React from 'react';

// antd
import { Card, notification, Popconfirm, Upload } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined, UploadOutlined, BookOutlined } from '@ant-design/icons';

// custom
import { Ebook } from '../../../../store/ebooks/types';

// css
import "./ebooks-card.less";
import { RcFile } from 'antd/lib/upload';
import axios from '../../../../axios/axios';
import { getEbooksCollection } from '../../../../store/ebooks/actions';
import { useDispatch } from 'react-redux';


interface ComponentProps {
  addCard?: boolean;
  className?: string;

  data?: Ebook;

  onClick?: () => void;
  onEditClick?: (data?: Ebook) => void;
  onDelete?: (data?: Ebook) => void;

}

function EbookCard(props: ComponentProps) {
  const { addCard } = props;
  const dispatch = useDispatch();

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


  const handleUpload = async (file: RcFile, fileType: "file" | "coverImage") => {
    const formData = new FormData();
    formData.append(fileType, file);

    try {
      await axios.put(`/ebook/ebook/${props.data?._id}`, formData);
      dispatch(getEbooksCollection());

    } catch (e) {
      notification.error({ message: "The upload failed" })
    }

    return false;
  };




  return (
    <Card className={["card", addCard ? "add" : "", props.className ? props.className : ""].join(" ")}
      onClick={onClick}
      cover={addCard ? null : (
        <Upload fileList={[]} beforeUpload={(file) => handleUpload(file, "coverImage")}>
          <img className="card__cover" alt="ebook cover" src={props.data?.coverImage ? props.data.coverImage : "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"} />
        </Upload>

      )}
      actions={addCard ? [] : [
        <Upload fileList={[]} beforeUpload={(file) => handleUpload(file, "file")}><UploadOutlined></UploadOutlined></Upload>,
        <EditOutlined onClick={onEditClick} key="edit" />,
        <Popconfirm okButtonProps={{ type: "primary", className: "btn-delete" }} okText="Usuń" title="Chcesz usunąć tego ebooka?" onConfirm={onDelete}><DeleteOutlined className="red" /></Popconfirm>
      ]
      }
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
            {props.data?.file ? (
              <div className="card__link"><a href={props.data?.file}><BookOutlined />  Ebook</a></div>
            ) : null}
          </>}
        />

      )}
    </Card>
  );
}

export default EbookCard;
