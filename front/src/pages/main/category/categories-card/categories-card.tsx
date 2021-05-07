// core
import React from 'react';

// antd
import { Card, Popconfirm } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

// css
import "./categories-card.less";
import { Category } from '../../../../store/category/types';

// components

interface ComponentProps {
  data?: Category;
  onClick?: (data?: Category) => void;
  onEditClick?: (data?: Category) => void;

  onDelete?: (data?: Category) => void;
  addCard?: boolean;
  className?: string;
}

function CategoriesCard(props: ComponentProps) {

  const { addCard } = props;

  const onClick = (event: any) => {
    if (props.onClick) {
      props.onClick(props.data);
    }
  }

  const onEditClick = () => {
    if (props.onEditClick) {
      props.onEditClick(props.data);
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
      actions={addCard ? [] : [
        <EditOutlined onClick={onEditClick} key="edit" />,
        <Popconfirm okButtonProps={{ type: "primary", className: "btn-delete" }} okText="Usuń" title="Chcesz usunąć tę kategorię?" onConfirm={onDelete}><DeleteOutlined className="red" /></Popconfirm>
      ]
      }
    >
      {addCard ? (
        <div className="card__add">
          <PlusCircleOutlined />
        </div>
      ) : (
        <Meta
          title={props.data?.name}
          description={props.data?.description}
        />

      )}
    </Card>
  );
}

export default CategoriesCard;
