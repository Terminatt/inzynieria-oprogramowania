// core
import React from 'react';

// antd
import { Card, Popconfirm } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

// custom
import { Ebook } from '../../../../store/ebooks/types';

// css
import "./ebooks-card.less";


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
  return (
    <Card className={["card", addCard ? "add" : "", props.className ? props.className : ""].join(" ")}
      onClick={onClick}
      cover={addCard ? null : (
        <img alt="ebook cover" src={props.data?.coverImage ? props.data.coverImage : "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"} />
      )}
      actions={addCard ? [] : [
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
          </>}
        />

      )}
    </Card>
  );
}

export default EbookCard;
